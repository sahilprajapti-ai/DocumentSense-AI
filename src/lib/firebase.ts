import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use provisioned firestore database if specified, else default
export const db = firebaseConfigData.firestoreDatabaseId && firebaseConfigData.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfigData.firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in or Create Account with Google Popup
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Sync or update user document in Firestore
    await syncUserToFirestore(user, { plan: 'Pro Individual Plan' });
    return user;
  } catch (err: unknown) {
    const errCode = (err as { code?: string })?.code || '';
    if (errCode === 'auth/popup-closed-by-user' || errCode === 'auth/cancelled-popup-request') {
      // Normal user action, do not log console.error
      throw err;
    }
    console.warn('Google Sign-in status:', err);
    throw err;
  }
}

/**
 * Register with email and password
 */
export async function registerWithEmail(email: string, pass: string, name: string, persona: string = 'student') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Update display name in Firebase Auth
    if (name) {
      await updateProfile(user, { displayName: name });
    }

    // Save user profile in Firestore
    await syncUserToFirestore(user, {
      displayName: name || user.email?.split('@')[0] || 'User',
      persona,
      plan: 'Pro Individual Plan'
    });

    return user;
  } catch (err: unknown) {
    console.error('Registration failed:', err);
    throw err;
  }
}

/**
 * Sign in with email and password
 */
export async function loginWithEmail(email: string, pass: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    await syncUserToFirestore(user, {});
    return user;
  } catch (err: unknown) {
    console.error('Email sign-in failed:', err);
    throw err;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (err: unknown) {
    console.error('Password reset failed:', err);
    throw err;
  }
}

/**
 * Sign out user
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (err: unknown) {
    console.error('Sign-out failed:', err);
    throw err;
  }
}

/**
 * Sync user profile to Firestore `users/{uid}` with strict undefined-stripping
 */
export async function syncUserToFirestore(
  user: User,
  extra: { displayName?: string; persona?: string; plan?: string } = {}
) {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const existingSnap = await getDoc(userDocRef);

    const displayName = extra.displayName || user.displayName || user.email?.split('@')[0] || 'User';
    const email = user.email || '';
    const photoURL = user.photoURL || '';
    const plan = extra.plan || (existingSnap.exists() ? existingSnap.data()?.plan : 'Pro Individual Plan') || 'Pro Individual Plan';
    const persona = extra.persona || (existingSnap.exists() ? existingSnap.data()?.persona : 'student') || 'student';

    const providerId = user.providerData?.[0]?.providerId || 'password';

    const payload: Record<string, unknown> = {
      uid: user.uid,
      displayName,
      email,
      photoURL,
      plan,
      persona,
      providerId,
      emailVerified: user.emailVerified || false,
      updatedAt: serverTimestamp(),
    };

    if (!existingSnap.exists()) {
      payload.createdAt = serverTimestamp();
    }

    // Zero-undefined stripping
    const cleanPayload = JSON.parse(JSON.stringify(payload));
    await setDoc(userDocRef, cleanPayload, { merge: true });
  } catch (err) {
    console.warn('Could not sync user to Firestore (rules or network):', err);
  }
}

/**
 * Get user profile document from Firestore
 */
export async function fetchUserProfile(uid: string) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('Failed to fetch user profile:', err);
    return null;
  }
}

/**
 * Update user profile document in Firestore and Auth with strict undefined-stripping
 */
export async function updateUserProfileDoc(
  uid: string,
  updates: { displayName?: string; persona?: string; plan?: string; photoURL?: string }
) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const payload: Record<string, unknown> = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    // Strict zero-undefined stripping
    const cleanPayload = JSON.parse(JSON.stringify(payload));
    await setDoc(userDocRef, cleanPayload, { merge: true });

    // Sync Firebase Auth profile if current user matches
    if (auth.currentUser && auth.currentUser.uid === uid) {
      const authUpdates: { displayName?: string; photoURL?: string } = {};
      if (updates.displayName) authUpdates.displayName = updates.displayName;
      if (updates.photoURL) authUpdates.photoURL = updates.photoURL;
      if (Object.keys(authUpdates).length > 0) {
        await updateProfile(auth.currentUser, authUpdates);
      }
    }
    return true;
  } catch (err) {
    console.error('Failed to update user profile in Firestore:', err);
    throw err;
  }
}

/**
 * Submit enterprise / sales lead inquiry to Firestore `sales_inquiries`
 */
export async function submitSalesInquiry(
  data: {
    fullName: string;
    email: string;
    company: string;
    teamSize?: string;
    volume?: string;
    useCase?: string;
    compliance?: string[];
    message?: string;
    phone?: string;
    preferredTimeline?: string;
  },
  userId?: string
) {
  try {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const ticketId = `DS-ENT-${randomSuffix}`;
    const inquiryDocRef = doc(db, 'sales_inquiries', ticketId);

    const payload: Record<string, unknown> = {
      id: ticketId,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      company: data.company.trim(),
      teamSize: data.teamSize || '10-50 users',
      volume: data.volume || '100-500 documents/mo',
      useCase: data.useCase || 'General Enterprise Legal & Compliance',
      compliance: data.compliance || ['SOC2 Type II', 'GDPR', 'AES-256 Storage'],
      message: data.message ? data.message.trim() : '',
      phone: data.phone ? data.phone.trim() : '',
      preferredTimeline: data.preferredTimeline || 'Immediate (Next 7 days)',
      status: 'new',
      userId: userId || (auth.currentUser ? auth.currentUser.uid : null),
      createdAt: serverTimestamp(),
    };

    // Strict zero-undefined stripping
    const cleanPayload = JSON.parse(JSON.stringify(payload));
    await setDoc(inquiryDocRef, cleanPayload);
    return ticketId;
  } catch (err) {
    console.error('Failed to submit sales inquiry to Firestore:', err);
    throw err;
  }
}

/**
 * Listen to Firebase Auth state
 */
export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export { auth };
