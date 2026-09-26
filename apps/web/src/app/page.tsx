import ApplicationForm from "@/components/ApplicationForm";
import { Container, Typography, Box, Stack } from "@mui/material";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 8, pb: 12 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Sparkles size={36} color="#1976d2" />
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 800, color: "#1a1a1a" }}
            >
              AI Smart Applier
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 650, mx: "auto", lineHeight: 1.6 }}
          >
            Upload your resume, add the job description, and our AI will analyze
            the company, determine your match score, generate a perfect Cover
            Letter, and tailor your CV.
          </Typography>
        </Box>

        <ApplicationForm />
      </Container>
    </Box>
  );
}
