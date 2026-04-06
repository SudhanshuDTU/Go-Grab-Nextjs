// src/components/HomeScreen/PrivacyPolicy/PrivacyPolicy.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — pure static content, zero interactivity.
//  No "use client" → fully SSR'd.
//
//  Changes from original:
//  1. Inline styles → CSS file (Next.js best practice,
//     also fixes the broken ':hover' and '@media' in your
//     original JS styles object — those don't work in React
//     inline styles, only in CSS files)
//  2. robots: { index: false } is set in the route page.jsx
//     (already done in our earlier all-pages.jsx file)
//     so Google won't index this legal page, preserving
//     SEO equity for your main pages
// ─────────────────────────────────────────────────────────────

import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="pp-container">
      <div className="pp-content">

        <h1 className="pp-heading">Privacy Policy</h1>

        <p className="pp-paragraph">
          Go-Grab ("we", "our", or "us") is committed to protecting the privacy
          of users of the Go-Grab App ("the App"). This App is designed
          exclusively for internal use by authorized operations team members to
          manage, monitor, and maintain the operations of Go-Grab vending
          machines.
        </p>

        <h2 className="pp-subheading">1. Information We Collect</h2>
        <ul className="pp-list">
          <li className="pp-list-item">
            <strong>User Information:</strong> Name, email address, employee ID,
            and phone number (for user authentication and accountability).
          </li>
          <li className="pp-list-item">
            <strong>Device Information:</strong> Device model, operating system,
            unique device identifiers (used for security and performance
            monitoring).
          </li>
          <li className="pp-list-item">
            <strong>Location Data:</strong> With user permission, we may collect
            location data to confirm the physical presence of operations staff
            near vending machines.
          </li>
          <li className="pp-list-item">
            <strong>Operational Data:</strong> Logs of activities performed via
            the App, including machine refill status, maintenance tasks, and
            audit logs.
          </li>
        </ul>

        <h2 className="pp-subheading">2. How We Use Your Information</h2>
        <p className="pp-paragraph">
          We use the collected information solely for operational purposes:
        </p>
        <ul className="pp-list">
          <li className="pp-list-item">To authenticate and authorize team members.</li>
          <li className="pp-list-item">To assign and track operational tasks.</li>
          <li className="pp-list-item">
            To improve the reliability, security, and efficiency of vending
            machine operations.
          </li>
          <li className="pp-list-item">
            To generate internal reports for logistics, refilling, and
            maintenance.
          </li>
        </ul>

        <h2 className="pp-subheading">3. Data Sharing</h2>
        <p className="pp-paragraph">
          We do not sell or share your data with any third parties for marketing
          purposes. Data may be shared internally within Go-Grab with authorized
          personnel strictly on a need-to-know basis.
          <br /><br />
          We may share limited data with service providers (e.g., cloud services
          or analytics tools) under strict data processing agreements and only
          for the purpose of improving internal operations.
        </p>

        <h2 className="pp-subheading">4. Data Retention</h2>
        <p className="pp-paragraph">
          We retain operational and user data only as long as necessary for
          business and compliance purposes. When no longer needed, data is
          securely deleted or anonymized.
        </p>

        <h2 className="pp-subheading">5. Data Security</h2>
        <p className="pp-paragraph">
          We implement appropriate technical and organizational measures to
          protect your data against unauthorized access, disclosure, or
          destruction. These include access controls, encryption, secure APIs,
          and audit logging.
        </p>

        <h2 className="pp-subheading">6. User Rights and Access</h2>
        <p className="pp-paragraph">
          Since the App is used internally, access is managed by Go-Grab. If
          you believe your personal information is incorrect or you wish to raise
          concerns, please contact your team supervisor or email us at{' '}
          <a href="mailto:ops-support@go-grab.in" className="pp-link">
            ops-support@go-grab.in
          </a>
          .
        </p>

        <h2 className="pp-subheading">7. Permissions Required</h2>
        <p className="pp-paragraph">The App may request the following permissions:</p>
        <ul className="pp-list">
          <li className="pp-list-item">
            Location Access (for confirming machine visits)
          </li>
          <li className="pp-list-item">
            Camera Access (for scanning barcodes or uploading machine images)
          </li>
          <li className="pp-list-item">
            Storage Access (for uploading operational documents or images)
          </li>
        </ul>
        <p className="pp-paragraph">
          All permissions are used strictly for internal operations purposes.
        </p>

        <h2 className="pp-subheading">8. Changes to This Policy</h2>
        <p className="pp-paragraph">
          We may update this Privacy Policy from time to time. Any significant
          changes will be communicated via email or within the App.
        </p>

        <h2 className="pp-subheading">9. Contact Us</h2>
        <p className="pp-paragraph">
          If you have any questions about this Privacy Policy, please contact:
          <br />
          <strong>Go-Grab Operations Team</strong>
          <br />
          Email:{' '}
          <a href="mailto:ops-support@go-grab.in" className="pp-link">
            ops-support@go-grab.in
          </a>
          <br />
          Website:{' '}
          <a
            href="https://go-grab.in"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-link"
          >
            https://go-grab.in
          </a>
        </p>

      </div>
    </div>
  );
}