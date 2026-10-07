
"use client";

import { useState } from "react";
import { Button, CircularProgress, Alert, Snackbar } from "@mui/material";
import { TableProperties } from "lucide-react";
import { saveToGoogleSheets } from "../../lib/api";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";

interface SaveToSheetsButtonProps {
  companyName: string;
  jobTitle?: string;
  jobUrl?: string;
  matchScore: number;
}

export default function SaveToSheetsButton({
  companyName,
  jobTitle,
  jobUrl,
  matchScore,
}: SaveToSheetsButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await saveToGoogleSheets({
        companyName,
        jobTitle,
        jobUrl: jobUrl || companyName, 
        matchScore,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving to sheets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={loading || success}
        startIcon={
          loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <TableProperties size={20} />
          )
        }
        sx={{
          py: 1.2,
          px: 3,
          fontWeight: 700,
          fontSize: "1.05rem",
          textTransform: "none",
          borderRadius: 2,
          background: GRADIENTS.mainButtonAnimated, 
          backgroundSize: "200% auto",
          color: COLORS.lightBg,
          boxShadow: SHADOWS.btnGrad,
          transition: "0.5s ease",

          "&:hover": {
            backgroundPosition: "right center", 
            boxShadow: SHADOWS.btnGradHover,
          },

          "&.Mui-disabled": {
            background: COLORS.disabledBg,
            color: COLORS.textMuted,
            boxShadow: "none",
            backgroundSize: "auto",
          },
        }}
        fullWidth
      >
        {loading
          ? "Saving..."
          : success
            ? "Saved to Google Sheets!"
            : "Save Application to Google Sheets"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}