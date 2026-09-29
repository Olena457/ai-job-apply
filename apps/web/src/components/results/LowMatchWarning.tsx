"use client";

import { Alert, AlertTitle, Typography } from "@mui/material";

interface LowMatchWarningProps {
  score: number;
}

export default function LowMatchWarning({ score }: LowMatchWarningProps) {
  return (
    <Alert
      severity="warning"
      variant="outlined"
      sx={{ borderRadius: 3, py: 2 }}
    >
      <AlertTitle sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
        Low Match Score: {score}%
      </AlertTitle>
      <Typography variant="body2">
        The probability that your experience is sufficient for this position or
        that you will be invited for an interview is very low. To save your time
        (and avoid generating irrelevant data), we have skipped the creation of
        a cover letter and a tailored resume. Please try another job that better
        matches your skills!
      </Typography>
    </Alert>
  );
}