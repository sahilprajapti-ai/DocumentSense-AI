import { DocumentData, DashboardDocItem } from '../types';

export const DOCUMENTS_DB: Record<string, DocumentData> = {
  scholarship: {
    id: 'scholarship',
    title: 'Central Ministry Merit Scholarship 2026',
    category: 'government',
    badge: 'Government Circular',
    filename: 'Circular_MoHFW_Scholarship_2026_Final.pdf',
    confidence: '98.6%',
    authority: 'MINISTRY OF HIGHER EDUCATION & RESEARCH',
    office: 'Department of Student Financial Assistance — Central Grants Wing',
    refNo: 'Ref: F.No. 42-18/2026-NMS/CG | Date: 12 January 2026',
    subject: 'SUBJECT: NOTIFICATION FOR NATIONAL MERIT SCHOLARSHIP (NMS-2026) APPLICANTS & VERIFICATION DIRECTIVE',
    paragraphs: [
      '1. Applications are hereby invited from meritorious candidates enrolled in recognized collegiate programs for the National Merit Scholarship (NMS-2026). The scheme provides an annual financial grant of up to ₹1,20,000 for qualifying undergraduate and postgraduate scholars.',
      '2. <span class="doc-hl hl-date" data-hl-id="d1">The application submission portal opens officially on 15th January 2026</span> and candidates must ensure initial profile creation prior to uploading supporting credentials.',
      '3. <span class="doc-hl hl-action" data-hl-id="a1">Clause 3.1: Candidates are required to fill all 6 sections of Form 4A</span> through the designated National Scholarship Portal without introducing typographical discrepancies against their matriculation records.',
      '4. <span class="doc-hl hl-doc" data-hl-id="c1">Mandatory identity verification requires an active Aadhaar Card linked to a mobile number</span> and a valid <span class="doc-hl hl-doc" data-hl-id="c2">Income Certificate issued by a Competent Tehsildar authority</span> showing annual gross family income not exceeding ₹8,00,000.',
      '5. Supporting documentary proof must also include the candidate’s <span class="doc-hl hl-doc" data-hl-id="c3">Previous Qualifying Academic Marksheet</span> reflecting minimum 75.00% aggregate score, alongside a recent <span class="doc-hl hl-doc" data-hl-id="c4">Bank Statement or cancelled cheque</span> and two <span class="doc-hl hl-doc" data-hl-id="c5">self-attested passport-size photographs</span>.',
      '6. <span class="doc-hl hl-date" data-hl-id="d2">CRITICAL DEADLINE: The final date for uploading documents and locking the application is 15th February 2026 at 23:59 IST.</span> Under no circumstances will extensions be entertained. Failure to submit within the stipulated window results in deemed forfeiture.',
      '7. <span class="doc-hl hl-term" data-hl-id="t1">All disbursements are executed pari passu</span> according to district merit quotas. Any applicant caught engaging in duplicate claims shall be subject to <span class="doc-hl hl-term" data-hl-id="t2">summary revocation and recovery under the Public Demands Act</span>.',
      '8. <span class="doc-hl hl-missing" data-hl-id="m1">NOTE: The physical verification docket must bear the seal and counter-signature of the Head of the Institution / College Principal</span> prior to onward dispatch to the nodal welfare officer.'
    ],
    summary: {
      lead: "This is an official government scholarship circular offering up to ₹1,20,000 per academic year for qualifying university students. To receive funds, you must verify your family income, submit certified marksheets online, and acquire your college principal's seal before the strict final deadline.",
      bullets: [
        "What it is: Central higher-education financial grant for undergraduate & graduate programs.",
        "Your direct obligation: Complete Stage 1 verification online within the designated window.",
        "Critical Risk: Late submissions are rejected automatically with zero appeal window."
      ]
    },
    dates: [
      { id: 'd1', title: 'Application Portal Opens', date: 'Jan 15, 2026', desc: 'Online portal registration begins for all colleges', urgent: false, done: true },
      { id: 'd2', title: 'Final Document Submission Cut-off', date: 'Feb 15, 2026', desc: 'Strict lock deadline (23:59 IST). No extensions allowed.', urgent: true, done: false },
      { id: 'd3', title: 'College Institutional Verification', date: 'Feb 28, 2026', desc: 'College principal submits signed docket to state nodal wing', urgent: false, done: false },
      { id: 'd4', title: 'Merit List & Direct Fund Disbursement', date: 'Mar 20, 2026', desc: 'Direct DBT bank transfer of ₹1,20,000 to approved accounts', urgent: false, done: false }
    ],
    checklist: [
      { id: 'c1', name: 'Aadhaar Card', req: true, checked: true, note: 'Must be linked to active mobile for OTP validation' },
      { id: 'c2', name: 'Income Certificate', req: true, checked: true, note: 'Issued by Tehsildar, annual gross income below ₹8 Lakhs' },
      { id: 'c3', name: 'Qualifying Marksheet', req: true, checked: true, note: 'Minimum 75% aggregate score from recognized board' },
      { id: 'c4', name: 'Bank Statement / Cancelled Cheque', req: true, checked: false, note: 'Account must match applicant name exactly with active DBT' },
      { id: 'c5', name: 'Self-attested Passport Photos (x2)', req: false, checked: false, note: 'Recent photograph with white background' }
    ],
    actions: [
      { num: '01', title: 'Complete Form 4A on Portal', desc: 'Fill personal, college, and course details without name mismatch against 10th certificate.', prio: 'High' },
      { num: '02', title: 'Upload Scanned Certificates', desc: 'Ensure PDF scans are under 500KB and clear enough for automated biometric matching.', prio: 'High' },
      { num: '03', title: 'Get Principal Countersignature', desc: 'Print physical verification docket and obtain college seal from Dean/Principal office.', prio: 'High' },
      { num: '04', title: 'Lock and Submit Before Feb 15', desc: 'Click final freeze and download confirmation receipt with tracking acknowledgement ID.', prio: 'Critical' }
    ],
    terms: [
      { id: 't1', original: 'Pari passu', meaning: 'In equal proportion and on equal footing with everyone else.', why: 'No individual student gets special preference; all approved scholars in a quota receive funds simultaneously.' },
      { id: 't2', original: 'Summary revocation', meaning: 'Immediate cancellation of your award without a formal hearing.', why: 'If any discrepancy or false certificate is found, the scholarship is cancelled immediately and funds must be repaid.' },
      { id: 't3', original: 'Self-attestation', meaning: 'Signing your own name on photocopied documents declaring they are genuine.', why: 'Unsigned copies are rejected automatically under Section 4.2.' },
      { id: 't4', original: 'Deemed forfeiture', meaning: 'Giving up your legal right to the scholarship simply by missing the date.', why: 'Missing the Feb 15 cut-off by even 1 minute legally forfeits your entitlement.' }
    ],
    missing: [
      { id: 'm1', title: 'College Principal Seal & Signature Block', desc: 'The application document shows an empty counter-signature line.', fix: 'Visit your college administrative office for an official seal.' },
      { id: 'm2', title: 'Income Certificate Issuance Date', desc: 'Income certificate reference number is cited, but validity year is unspecified.', fix: 'Ensure your certificate is dated for the current financial year (2025-2026).' },
      { id: 'm3', title: 'Bank Account IFSC Validation', desc: 'Branch code is entered with 10 digits instead of required 11 characters.', fix: 'Re-verify your bank passbook IFSC code (5th character must be zero).' }
    ],
    pages: 3,
    dateAnalyzed: '2026-01-26'
  },

  lease: {
    id: 'lease',
    title: 'Commercial Office Space Lease Agreement',
    category: 'contract',
    badge: 'Legal Contract',
    filename: 'Lease_Commercial_Suite402_PrimeTowers.pdf',
    confidence: '96.2%',
    authority: 'PRIME TOWERS REALTY ASSET MANAGEMENT LLC',
    office: 'Commercial Leasing & Tenancy Governance Division',
    refNo: 'Ref: LSE-2026-BLR-0402 | Date: 05 February 2026',
    subject: 'SUBJECT: INDENTURE OF LEASE FOR PREMISES SUITE 402, 4TH FLOOR, PRIME COMMERCIAL TOWER',
    paragraphs: [
      '1. This Indenture of Lease is made between Prime Towers Realty LLC ("Lessor") and Vertex Technologies Inc. ("Lessee") for Suite 402 comprising 2,400 sq.ft carpet area.',
      '2. <span class="doc-hl hl-date" data-hl-id="d1">The lease commencement date is fixed as 1st March 2026</span> for an initial tenure of 36 consecutive calendar months.',
      '3. <span class="doc-hl hl-action" data-hl-id="a1">Clause 4: The Lessee shall remit a monthly base rent of $4,800 on or before the 5th day of each calendar month</span> without any abatement or deductions.',
      '4. <span class="doc-hl hl-doc" data-hl-id="c1">Mandatory security deposit requires 6 months rent ($28,800) in interest-free refundable deposit</span> alongside <span class="doc-hl hl-doc" data-hl-id="c2">Certificate of Commercial General Liability Insurance ($1,000,000 coverage)</span>.',
      '5. <span class="doc-hl hl-term" data-hl-id="t1">Clause 8.3: CAM (Common Area Maintenance) expenses are subject to an uncapped proportionate escalation</span> assessed annually by the building management council.',
      '6. <span class="doc-hl hl-date" data-hl-id="d2">CRITICAL NOTICE: Written notice of lease renewal or non-renewal must be furnished 90 days prior to expiry (November 30, 2028).</span>',
      '7. <span class="doc-hl hl-missing" data-hl-id="m1">NOTE: The agreement lacks an HVAC maintenance cap and mentions no standard for wear and tear remediation upon handover.</span>'
    ],
    summary: {
      lead: "This is a 3-year commercial office space lease agreement for 2,400 sq.ft at $4,800/month. The tenant must deposit $28,800 and furnish commercial insurance. DocumentSense AI flagged an uncapped CAM fee escalation and missing HVAC repair definitions.",
      bullets: [
        "What it is: Binding 36-month commercial real estate tenancy contract.",
        "Financial Commitment: $4,800/mo rent + $28,800 security deposit.",
        "Major Warning: Uncapped CAM escalation could increase monthly costs unexpectedly by 15-25%."
      ]
    },
    dates: [
      { id: 'd1', title: 'Lease Commencement & Handover', date: 'Mar 01, 2026', desc: 'Premises keys and fit-out possession transferred', urgent: false, done: false },
      { id: 'd2', title: 'Security Deposit & First Month Rent Wire', date: 'Feb 20, 2026', desc: 'Wire total of $33,600 to escrow account', urgent: true, done: false },
      { id: 'd3', title: 'Insurance Certificate Filing', date: 'Feb 25, 2026', desc: 'Submit Certificate of Liability naming Lessor as additional insured', urgent: false, done: false },
      { id: 'd4', title: '90-Day Renewal Notice Window', date: 'Nov 30, 2028', desc: 'Formal deadline to opt for 3-year extension option', urgent: false, done: false }
    ],
    checklist: [
      { id: 'c1', name: 'Security Deposit ($28,800)', req: true, checked: true, note: 'Wire transfer receipt to designated escrow bank' },
      { id: 'c2', name: 'Liability Insurance Policy ($1M)', req: true, checked: false, note: 'Must list Prime Towers LLC as additional insured' },
      { id: 'c3', name: 'Corporate Board Resolution', req: true, checked: true, note: 'Authorizing signatory to execute lease' },
      { id: 'c4', name: 'Business Registration / Tax ID', req: true, checked: true, note: 'Certificate of incorporation and state sales tax permit' }
    ],
    actions: [
      { num: '01', title: 'Negotiate CAM Escalation Cap', desc: 'Request an amendment capping annual CAM increases to max 6% per annum.', prio: 'Critical' },
      { num: '02', title: 'Bind Commercial Insurance', desc: 'Forward lease Exhibit B to insurance broker for immediate certificate issuance.', prio: 'High' },
      { num: '03', title: 'Complete Move-In Inspection', desc: 'Document existing carpet and electrical condition with photographic audit.', prio: 'Medium' }
    ],
    terms: [
      { id: 't1', original: 'Uncapped CAM Escalation', meaning: 'The landlord can pass on unlimited increases in building maintenance, electricity, and security costs.', why: 'Could increase your effective monthly rent by $800 to $1,500 without your approval.' },
      { id: 't2', original: 'Indenture of Lease', meaning: 'A formal legal deed between two or more parties outlining property obligations.', why: 'Legally enforceable in civil court with severe penalties for early termination.' },
      { id: 't3', original: 'Abatement', meaning: 'A reduction or waiver in rent due to property disruption or damage.', why: 'Clause 4 explicitly forbids you from withholding rent even if building facilities fail.' }
    ],
    missing: [
      { id: 'm1', title: 'HVAC Air-Conditioning Repair Cap', desc: 'No clause states who pays if the central compressor breaks down.', fix: 'Add landlord clause: Landlord responsible for HVAC capital replacements exceeding $500.' },
      { id: 'm2', title: 'Normal Wear and Tear Definition', desc: 'Standard definition of acceptable handover condition is missing.', fix: 'Insert clause: Lessee not liable for ordinary wear and tear upon surrender.' }
    ],
    pages: 18,
    dateAnalyzed: '2026-01-24'
  },

  insurance: {
    id: 'insurance',
    title: 'Health Insurance Claim Denial & Appeal',
    category: 'insurance',
    badge: 'Medical Insurance',
    filename: 'Health_Claim_Denial_Notice_ApolloCare.pdf',
    confidence: '99.1%',
    authority: 'APOLLO HEALTH ASSURANCE CORPORATION',
    office: 'Grievance Redressal & Claims Adjudication Cell',
    refNo: 'Ref: CLM-DEN-2026-88192 | Date: 20 January 2026',
    subject: 'SUBJECT: NOTICE OF CLAIM ADJUDICATION & DENIAL UNDER SECTION 4.3 (SURGICAL EXPENSES)',
    paragraphs: [
      '1. We write regarding Hospitalization Claim #88192 submitted for patient Priya Sharma totaling ₹1,84,500 incurred at Holy Family Medical Center.',
      '2. <span class="doc-hl hl-action" data-hl-id="a1">Claim Denial: Following internal medical review, the cashless authorization is DENIED under Exclusion Clause 4.3</span> (Pre-Existing Condition Waiting Period).',
      '3. <span class="doc-hl hl-term" data-hl-id="t1">The insurer contends the surgical procedure falls under a 24-month moratorium</span> since the policy inception date was 14 months prior.',
      '4. <span class="doc-hl hl-date" data-hl-id="d1">APPEAL WINDOW: The claimant possesses the statutory right to file a Tier 1 Grievance within 30 days of this notice (Feb 19, 2026).</span>',
      '5. To overturn this denial, the claimant must submit: <span class="doc-hl hl-doc" data-hl-id="c1">First Consultation Medical Record</span>, <span class="doc-hl hl-doc" data-hl-id="c2">Attending Surgeon Clinical Justification Letter</span> certifying the condition was acute and not chronic, and <span class="doc-hl hl-doc" data-hl-id="c3">Itemized Hospital Pharmacy Invoices</span>.',
      '6. <span class="doc-hl hl-missing" data-hl-id="m1">NOTE: The original discharge summary omits the exact onset timeline of acute symptoms, which triggered the automatic pre-existing flag.</span>'
    ],
    summary: {
      lead: "Your ₹1,84,500 health insurance claim was denied because the insurer misclassified your acute condition as a pre-existing illness under Clause 4.3. You have 30 days (until Feb 19) to file a Tier 1 appeal with a doctor's certificate proving acute onset.",
      bullets: [
        "What it is: Formal claim denial letter with grievance appeal rights.",
        "Crucial Reason: Alleged pre-existing condition waiting period violation.",
        "Action to Overturn: Submit attending surgeon's certificate within 30 days."
      ]
    },
    dates: [
      { id: 'd1', title: 'Tier 1 Grievance Appeal Deadline', date: 'Feb 19, 2026', desc: 'Absolute cut-off to appeal denial before Insurance Ombudsman escalation', urgent: true, done: false },
      { id: 'd2', title: 'Insurer 15-Day Mandatory Response', date: 'Mar 06, 2026', desc: 'Insurer must formally accept or provide written justification', urgent: false, done: false }
    ],
    checklist: [
      { id: 'c1', name: 'Attending Surgeon Clinical Certificate', req: true, checked: false, note: 'Must explicitly state condition was acute and sudden onset' },
      { id: 'c2', name: 'First Consultation Medical Record', req: true, checked: true, note: 'Proves patient had no prior history of complaint' },
      { id: 'c3', name: 'Itemized Hospital Bill & Pharmacy Slips', req: true, checked: true, note: 'Original stamped invoices with batch numbers' },
      { id: 'c4', name: 'Signed Grievance Form G-1', req: true, checked: false, note: 'Official ombudsman standardized grievance appeal format' }
    ],
    actions: [
      { num: '01', title: 'Obtain Surgeon Acute Certificate', desc: 'Ask treating physician for formal letter certifying acute condition not pre-existing.', prio: 'Critical' },
      { num: '02', title: 'Submit Grievance Form G-1', desc: 'File appeal via online portal and speed post with tracking delivery confirmation.', prio: 'High' },
      { num: '03', title: 'Escalate to IRDAI Bima Bharosa', desc: 'If insurer fails to respond in 15 days, lodge complaint on government portal.', prio: 'Medium' }
    ],
    terms: [
      { id: 't1', original: 'Moratorium / Waiting Period', meaning: 'A fixed duration (usually 2 to 4 years) where specific illnesses are not covered.', why: 'Insurers often default to this rejection even for acute unexpected emergencies.' },
      { id: 't2', original: 'Tier 1 Grievance', meaning: 'The first official step to challenge an insurance denial with senior claim managers.', why: 'Over 68% of erroneous denials are reversed at Tier 1 with proper clinical notes.' }
    ],
    missing: [
      { id: 'm1', title: 'Doctor Declaration of Acute Onset', desc: 'The discharge summary fails to clearly state the exact hour and day symptoms began.', fix: 'Obtain addendum letter from the hospital medical superintendent.' }
    ],
    pages: 5,
    dateAnalyzed: '2026-01-22'
  },

  visa: {
    id: 'visa',
    title: 'University Visa & Foreign Grant Clearance',
    category: 'university',
    badge: 'University & Immigration',
    filename: 'Visa_Clearance_Notice_GlobalStudies.pdf',
    confidence: '97.8%',
    authority: 'OFFICE OF INTERNATIONAL SERVICES & IMMIGRATION',
    office: 'Student & Scholar Regulatory Compliance Wing',
    refNo: 'Ref: SEVIS-F1-2026-9041 | Date: 18 January 2026',
    subject: 'SUBJECT: ISSUANCE OF FORM I-20 & MANDATORY IMMIGRATION CLEARANCE DIRECTIVE FOR FALL 2026',
    paragraphs: [
      '1. Congratulations on your admission to the Master of Science program. To initiate visa sponsorship and obtain Form I-20, all international admits must complete regulatory verification.',
      '2. <span class="doc-hl hl-date" data-hl-id="d1">The financial documentation cut-off date is 1st April 2026</span> for students commencing August 2026 studies.',
      '3. <span class="doc-hl hl-doc" data-hl-id="c1">Mandatory proofs: Valid Passport copy (minimum 6 months validity past program start)</span>, <span class="doc-hl hl-doc" data-hl-id="c2">Affidavit of Support signed by Sponsor</span>, and <span class="doc-hl hl-doc" data-hl-id="c3">Official Bank Letters demonstrating liquid funds of at least $58,400 USD</span>.',
      '4. <span class="doc-hl hl-term" data-hl-id="t1">Liquid funds must be immediately accessible; real estate valuations and illiquid retirement equities are strictly deemed non-conforming.</span>',
      '5. <span class="doc-hl hl-missing" data-hl-id="m1">NOTE: Bank letters without bank officer signature, contact stamp, and date within the last 90 days will be rejected.</span>'
    ],
    summary: {
      lead: "To receive your official student visa sponsorship (Form I-20), you must submit your passport, sponsor affidavit, and proof of $58,400 in liquid bank funds before April 1, 2026. Non-liquid assets like property will cause immediate rejection.",
      bullets: [
        "What it is: Mandatory international student visa sponsorship filing directive.",
        "Total Financial Proof: $58,400 in immediately withdrawable funds.",
        "Deadline: April 1, 2026 to ensure consular interview slot availability."
      ]
    },
    dates: [
      { id: 'd1', title: 'Financial Proof Cut-off', date: 'Apr 01, 2026', desc: 'All bank letters and sponsor affidavits must be verified', urgent: true, done: false },
      { id: 'd2', title: 'Form I-20 Digital Issuance', date: 'Apr 15, 2026', desc: 'Official SEVIS certificate issued for visa interview booking', urgent: false, done: false }
    ],
    checklist: [
      { id: 'c1', name: 'Passport Copy (6+ months validity)', req: true, checked: true, note: 'Biographical page with clear photo & signature' },
      { id: 'c2', name: 'Affidavit of Support (Form I-134)', req: true, checked: false, note: 'Notarized signature of primary financial sponsor' },
      { id: 'c3', name: 'Liquid Bank Verification Letter ($58,400+)', req: true, checked: false, note: 'Issued within past 90 days on official letterhead' }
    ],
    actions: [
      { num: '01', title: 'Obtain Official Bank Letter', desc: 'Request bank statement showing available savings balance in USD equivalent.', prio: 'High' },
      { num: '02', title: 'Execute Sponsor Affidavit', desc: 'Have parents or sponsor sign affidavit before a certified notary public.', prio: 'High' },
      { num: '03', title: 'Pay SEVIS I-901 Fee', desc: 'Upon I-20 receipt, pay $350 fee on fmjfee.com prior to consular interview.', prio: 'Medium' }
    ],
    terms: [
      { id: 't1', original: 'Liquid Funds', meaning: 'Money in savings or checking accounts that can be withdrawn immediately.', why: 'Property, gold, and stock options cannot be used to prove first-year tuition.' },
      { id: 't2', original: 'SEVIS I-20', meaning: 'The Certificate of Eligibility issued by the US Department of Homeland Security.', why: 'You cannot apply for or attend an F-1 visa interview without this active document.' }
    ],
    missing: [
      { id: 'm1', title: 'Bank Officer Notary Stamp', desc: 'Bank statement uploaded is an un-stamped internet web printout.', fix: 'Visit your local bank branch for an authorized wet ink stamp.' }
    ],
    pages: 4,
    dateAnalyzed: '2026-01-20'
  }
};

export const DASHBOARD_DOCS: DashboardDocItem[] = [
  { id: 'scholarship', name: 'Circular_MoHFW_Scholarship_2026_Final.pdf', cat: 'government', catName: 'Government', deadline: 'Feb 15, 2026', actions: '4 steps', conf: '98% High', status: 'Action Required', pages: 3, dateAnalyzed: '2026-01-26' },
  { id: 'lease', name: 'Lease_Commercial_Suite402_PrimeTowers.pdf', cat: 'contract', catName: 'Contracts & Leases', deadline: 'Mar 01, 2026', actions: '3 steps', conf: '96% High', status: '3 Missing Info', pages: 18, dateAnalyzed: '2026-01-24' },
  { id: 'insurance', name: 'Health_Claim_Denial_Notice_ApolloCare.pdf', cat: 'insurance', catName: 'Insurance', deadline: 'Feb 19, 2026', actions: '3 steps', conf: '99% High', status: 'Urgent Appeal', pages: 5, dateAnalyzed: '2026-01-22' },
  { id: 'visa', name: 'Visa_Clearance_Notice_GlobalStudies.pdf', cat: 'university', catName: 'University', deadline: 'Apr 01, 2026', actions: '3 steps', conf: '97% High', status: 'Pending Review', pages: 4, dateAnalyzed: '2026-01-20' },
  { id: 'tax-notice', name: 'ITR_Tax_Scrutiny_Notice_Sec143.pdf', cat: 'government', catName: 'Government', deadline: 'Mar 15, 2026', actions: '2 steps', conf: '95% High', status: 'Action Required', pages: 7, dateAnalyzed: '2026-01-18' },
  { id: 'univ-thesis', name: 'University_PhD_Thesis_Defense_Circular.pdf', cat: 'university', catName: 'University', deadline: 'Apr 10, 2026', actions: '5 steps', conf: '94% High', status: 'In Progress', pages: 12, dateAnalyzed: '2026-01-15' },
  { id: 'nda', name: 'Mutual_NDA_Confidentiality_SiliconVenture.pdf', cat: 'contract', catName: 'Contracts & Leases', deadline: 'No Cutoff', actions: '1 step', conf: '99% High', status: 'Ready to Sign', pages: 6, dateAnalyzed: '2026-01-12' },
  { id: 'auto-policy', name: 'Comprehensive_Auto_Policy_Addendum.pdf', cat: 'insurance', catName: 'Insurance', deadline: 'May 04, 2026', actions: '2 steps', conf: '92% High', status: 'Active', pages: 22, dateAnalyzed: '2026-01-10' }
];

export const INITIAL_USER: { name: string; email: string; plan: string; initials: string } = {
  name: 'David Reynolds',
  email: 'david.reynolds@example.com',
  plan: 'Pro Individual Plan',
  initials: 'DR'
};
