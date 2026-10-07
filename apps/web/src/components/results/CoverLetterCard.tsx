
"use client";

import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Copy, Check } from "lucide-react";
import { COLORS } from "@/constants/theme";

interface CoverLetterCardProps {
  initialLetter: string;
}

export default function CoverLetterCard({
  initialLetter,
}: CoverLetterCardProps) {
  const [letter, setLetter] = useState(initialLetter);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, border: `1px solid ${COLORS.border}` }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: COLORS.navy, 
          }}
        >
          Cover letter
        </Typography>

        <Button
          size="small"
          startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
          onClick={handleCopy}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            color: copied ? "success.main" : COLORS.navy,
            "&:hover": {
              bgcolor: "rgba(26, 41, 128, 0.05)",
            },
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Stack>

      <TextField
        multiline
        fullWidth
        minRows={10}
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: "0.95rem",
            color: COLORS.textPrimary,
            "& fieldset": {
              borderColor: COLORS.border,
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: COLORS.borderHover,
            },
            "&.Mui-focused fieldset": {
              borderColor: COLORS.navy,
            },
          },
        }}
      />
    </Paper>
  );
}