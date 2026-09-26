"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Skeleton,
  Paper,
} from "@mui/material";
import { Sparkles } from "lucide-react";

const AI_STEPS = [
  "Extracting job requirements...",
  "Researching company background and culture...",
  "Analyzing CV match and calculating score...",
  "Drafting a personalized cover letter...",
  "Tailoring CV to match job keywords...",
  "Finalizing documents...",
];

export default function AiLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < AI_STEPS.length - 1 ? prev + 1 : prev));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        border: "1px solid #e0e0e0",
      }}
      elevation={0}
    >
      <Stack spacing={3} sx={{ alignItems: "center", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.8 },
              "50%": { transform: "scale(1.1)", opacity: 1 },
              "100%": { transform: "scale(1)", opacity: 0.8 },
            },
          }}
        >
          <Sparkles size={40} color="#1976d2" />
        </Box>

        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            {AI_STEPS[currentStep]}
          </Typography>
          <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Box sx={{ width: "100%", mt: 4, textAlign: "left" }}>
          <Stack
            direction="row"
            spacing={3}
            sx={{ alignItems: "center", mb: 4 }}
          >
            <Skeleton variant="circular" width={80} height={80} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
            </Box>
          </Stack>

          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={150}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
