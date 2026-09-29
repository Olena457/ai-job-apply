"use client";

import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Copy, Check } from "lucide-react";

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
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <Typography variant="h6">Cover letter</Typography>
        <Button
          size="small"
          color={copied ? "success" : "primary"}
          startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
          onClick={handleCopy}
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
      />
    </Paper>
  );
}
