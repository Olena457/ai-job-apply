import styles from "./page.module.css";
import ApplicationForm from "../components/ApplicationForm";
import { Container, Typography, Box, Stack } from "@mui/material";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Sparkles size={32} color="#1976d2" />
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                AI Smart Applier
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
            >
              Upload your resume, add the job description, and the AI assistant
              will analyze the company, determine the match percentage, generate
              the perfect Cover Letter, and adapt your CV to their requirements.
            </Typography>

            {/* Form component for collecting user CV and job description */}
            <ApplicationForm />
          </Box>
        </Container>
      </main>
    </div>
  );
}
