# DocumentSense AI — Intelligent Document Simplifier & Action Planner

DocumentSense AI is a next-generation document intelligence platform that transforms dense, complex government notifications, university circulars, rental contracts, insurance policies, and legal forms into crystal-clear plain English summaries, actionable step-by-step checklists, cut-off deadline calendars, and interactive Q&A.

---

## 🛡️ Architecture & Features

1. **Interactive Split-Screen Viewer**:
   - **Rendered Document Source**: Interactive color-coded highlight spans (`hl-date`, `hl-doc`, `hl-action`, `hl-term`, `hl-missing`) with laser sweep scanning animation.
   - **Smart Insights Engine**: 6 tabbed panels (Summary, Key Dates & Deadlines, Required Prerequisites Checklist with dynamic progress percentage, Action Items, Difficult Legal Terms, Missing Information Warnings).
   - **Cross-Pane Synchronization**: Clicking any highlighted section immediately focuses the corresponding insight tab and displays decoded context.

2. **Sense AI Conversational Assistant**:
   - Real-time Q&A grounded strictly in the document text with clause citations.
   - Multi-model fallback ladder on the server (`gemini-3.6-flash` → `gemini-3.1-flash-lite` → `gemini-flash-latest` → `gemini-3.7-flash`).

3. **SaaS Workspace Dashboard**:
   - Overview metrics, Recent Documents repository table, Priority Checklist, and Deadlines Radar.
   - iCalendar `.ics` export utility for Google Calendar, Outlook, and Apple Calendar.
   - Plain-text executive brief exporter.

4. **Document Scanner & Multi-Stage Simulator**:
   - Accepts PDF, DOCX, TXT, and scanned image inputs or pasted raw text.
   - Multi-stage neural audit (OCR, Deadlines, Prerequisites, Jargon Buster, Missing Gaps).

5. **Authentication & Profile System**:
   - 1-Click Instant Demo Login as "David Reynolds (Pro Plan)".
   - Password strength evaluator and persona-based workspace customization.

---

## 🔒 Security & Threat Model

| Threat Zone | Identified Scenario / Threat | Countermeasure & Defensive Architecture |
|---|---|---|
| **1. Input Surfaces** | Malicious, oversized, or prompt-injected document payloads | 20MB top-level body parser limit; defensive null-safe destructuring; strict schema validation; text treated purely as passive data. |
| **2. Planning & Reasoning** | Jailbreaking Sense AI to bypass system boundaries | Grounded system instructions forcing citations from provided text; zero exposure of internal tools. |
| **3. Tool Execution** | SSRF or unauthorized command invocation | Server-side isolated endpoints without arbitrary shell or URL execution; pre-compiled fallback ladder. |
| **4. Memory & State** | Client credential theft or token exposure | API keys reside strictly on the server (`process.env.GEMINI_API_KEY`); client bundles contain zero credentials. |
| **5. Inter-System Comm** | API downtime, rate limits (429), or outages (503) | Reusable `generateContentWithFallback` helper cycling through resilient Gemini model aliases. |

---

## 🚀 Google Cloud Run Deployment Guide

### 1. Prerequisites & API Activation
Ensure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`) installed and authenticated:

```bash
# Log in to your Google Cloud account
gcloud auth login

# Set your active project
gcloud config set project YOUR_PROJECT_ID

# Enable required Google Cloud services
gcloud services enable \
  run.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com \
  cloudbuild.googleapis.com
```

### 2. Secret Manager Configuration
Store your Gemini API key in Google Cloud Secret Manager to prevent hardcoded credentials:

```bash
# Create the secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"

# Add your Gemini API key as a secret version
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Grant Cloud Run runtime service account access to read the secret
PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')

gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 3. Firestore Security Rules
Deploy secure, owner-bound rules in `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profile isolation
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // User document interactions isolation
      match /interactions/{interactionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Deploy the rules via Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

### 4. Deploy to Google Cloud Run
Build and deploy the containerized full-stack application to Cloud Run:

```bash
gcloud run deploy documentsense-ai \
  --source . \
  --region asia-east1 \
  --platform managed \
  --allow-unauthenticated \
  --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest" \
  --set-env-vars="NODE_ENV=production,PORT=3000"
```

### 5. Automated Verification Resource Labeling
Apply the mandatory resource label to register the service for automated challenge verification:

```bash
gcloud run services update documentsense-ai \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=asia-east1
```

---

## 🧪 Comprehensive Functional Test Walkthroughs

The following test suites map every user interaction to explicit verification steps:

### Test Suite 1: User Registration & Onboarding
1. **Open Register Dialog**: Click the **"Register"** button in the top navigation bar.
2. **Form Input**:
   - Enter Full Name: `Test Scholar`
   - Enter Email: `scholar@testdomain.com`
   - Enter Password: `SecurePassword123!` (Observe dynamic password strength bar transition to green "Strong").
   - Select Primary Focus Persona: Choose **"Student / Scholarship Applicant"**.
   - Check the **"I agree to the Terms of Service & Privacy Policy"** checkbox.
3. **Submission**: Click **"Create Pro Account"**.
4. **Expected Outcome**:
   - Firebase Auth registers user.
   - Profile documents are created in Firestore under `/users/{uid}` with strict undefined-stripping.
   - User profile badge appears in the top navigation bar with initials `TS`.
   - Toast notification: `"Welcome, Test Scholar!"`.

### Test Suite 2: Federated Google Sign-In
1. **Open Auth Dialog**: Click **"Log In"** in the top navigation bar.
2. **Trigger Google Provider**: Click the **"Google"** social login button.
3. **Popup Flow**: Complete Google OAuth selection in the popup window.
4. **Expected Outcome**:
   - Google credential successfully authenticates against Firebase.
   - User state synchronizes, storing `uid`, display name, email, and photo URL.
   - Modal closes automatically and navbar updates with user profile initials and avatar.

### Test Suite 3: Standard Email Sign-In & Validation
1. **Open Login Dialog**: Click **"Log In"** in the top navigation bar.
2. **Validation Check**: Click **"Sign In with Email"** without filling credentials.
   - Verify error alert: `"Please fill in both email and password."`.
3. **Valid Credentials**: Enter registered email and password. Click **"Sign In with Email"**.
4. **Expected Outcome**:
   - Firebase signs in and updates global user session.
   - Active user menu unlocks SaaS Workspace features.

### Test Suite 4: Password Reset Flow
1. **Navigate to Reset Form**: In the Auth modal, click **"Forgot password?"**.
2. **Enter Email**: Enter registered email address.
3. **Submit**: Click **"Send Reset Link"**.
4. **Expected Outcome**:
   - Success alert confirms: `"Password reset email sent to ... Please check your inbox."`.
   - Dialog transitions automatically back to the login tab after 2.5 seconds.

### Test Suite 5: 1-Click Instant Demo Login & Sign Out
1. **Launch Demo**: In the Auth modal, click the banner **"1-Click Instant Demo Login"**.
2. **Verification**: Session loads profile as "David Reynolds (DR)" with Pro Individual Plan.
3. **Sign Out Flow**:
   - Click user avatar menu in top navbar.
   - Select **"Sign Out"**.
   - Verify session resets to Guest view; toast confirms `"Signed out successfully."`.

### Test Suite 6: Document Analysis & Split-Screen Inspection
1. **Sample Selection**: Click **"Central Ministry Scholarship"** or **"Commercial Office Lease"** in the Hero sample pills.
2. **Scanning Animation**: Observe laser sweep overlay pass across the document.
3. **Cross-Pane Interaction**:
   - Click highlighted date span `<span class="doc-hl hl-date">...</span>` on the left pane.
   - Verify right pane switches to **"Key Dates & Deadlines"** tab with target date highlighted.
4. **Interactive Checklist**:
   - Navigate to **"Required Documents Checklist"** tab.
   - Click the checkbox for "Bank Statement / Cancelled Cheque".
   - Verify progress meter increments accurately.

### Test Suite 7: Calendar & Executive Brief Exports
1. **Export Deadlines**: Click **"Add All Deadlines to Calendar (.ics)"**.
   - Verify browser triggers download for `DocumentSense_Deadlines_<doc_id>.ics`.
2. **Export Executive Brief**: Click **"Export Brief"** in the viewer top bar.
   - Verify formatted plain-text file `DocumentSense_ExecutiveBrief_<doc_id>.txt` downloads.

### Test Suite 8: Sense AI Real-Time Document Q&A
1. **Floating Assistant**: Click the floating assistant pill in the bottom right or spotlight chat.
2. **Prompt Submission**: Click suggested prompt `"What are the mandatory documents I need to submit?"`.
3. **Expected Outcome**:
   - Server endpoint `/api/chat` processes the prompt via `generateContentWithFallback`.
   - Response streams or displays with exact clause references and deadline safeguards.

### Test Suite 9: User Profile Display, Editing & Cloud Synchronization
1. **Open User Profile Modal from Navbar**:
   - Click user avatar in top navbar.
   - Click **"View Profile & Account"**.
   - Verify modal opens with user avatar, name, plan badge ("Pro Individual Plan"), email, verified badge, and Firebase Auth UID with 1-click copy.
2. **Open User Profile from Workspace Dashboard**:
   - Click **"Launch SaaS Workspace"** or select **"Workspace Dashboard"** in menu.
   - In sidebar under Preferences & Account, click **"My Profile & Plan"** or click the User Card at the top of the sidebar.
   - Verify full-page User Profile view renders with metrics (12 documents, 8 deadlines, 2.4 GB storage, 98.8% accuracy), Active Extraction Persona card, and subscription perks.
3. **Edit Profile Details**:
   - In Profile modal or workspace tab, click **"Edit Profile Details"**.
   - Modify display name (e.g. "David C. Reynolds") and choose a persona (e.g. "Legal & Contract Reviewer" ⚖️).
   - Click **"Save Profile Changes"**.
   - Verify updates sync to Firestore `users/{userId}` via `updateUserProfileDoc` with zero-undefined hygiene.
   - Toast displays: `"Profile updated and saved to Firestore!"`.
4. **Data Portability & Security**:
   - In Profile modal, click **"Export Profile JSON"**.
   - Verify `documentsense_user_profile_<uid>.json` downloads with complete GDPR/portability structure.
   - In Security tab, click **"Send Password Reset Email"** to trigger a verified reset email.

---

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Start development server with hot full-stack reloading
npm run dev

# Lint code for TypeScript errors
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```
