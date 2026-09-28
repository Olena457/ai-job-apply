"use client";

import ApplicationForm from "@/components/ApplicationForm";
import { Container, Typography, Box, Stack } from "@mui/material";
import { Sparkles, CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Upload your resume & job description",
  "AI analysis of the target company",
  "Generate Cover Letter & tailor CV",
  "Calculate your detailed match score",
  "Auto-save to Google Sheets",
  "Track your application history",
];

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 3, pb: 9 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Sparkles size={36} color="#1976d2" />
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, color: "#1a1a1a" }}
            >
              AI Smart Applier
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              maxWidth: 680,
              mx: "auto",
              px: 1,
              textAlign: "left",
            }}
          >
            {FEATURES.map((feature) => (
              <Stack
                key={feature}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "flex-center" }}
              >
                <CheckCircle2
                  size={18}
                  color="#1976d2"
                  style={{ flexShrink: 0, marginTop: "3px" }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, lineHeight: 1.4 }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>

        <ApplicationForm />
      </Container>
    </Box>
  );
}
