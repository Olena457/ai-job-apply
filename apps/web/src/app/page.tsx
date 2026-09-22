import styles from "./page.module.css";
import ApplicationForm from "../components/ApplicationForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Main container for my AI application UI */}
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <h1>AI Smart Applier</h1>
          <p style={{ color: "#666", lineHeight: "1.5", marginBottom: "2rem" }}>
            Upload your resume, add the job description, and the AI assistant
            will analyze the company, determine the match percentage, generate
            the perfect Cover Letter, and adapt your CV to their requirements.
          </p>

          {/* Form component for collecting user CV and job description */}
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
