"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { X as CloseIcon } from "lucide-react";
import { COLORS } from "@/constants/theme";

interface ProfileSourceDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSourceDialog({
  open,
  onClose,
}: ProfileSourceDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 },
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: COLORS.navy, fontSize: "1.1rem" }}
        >
          About Profile Source
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: COLORS.border, py: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", lineHeight: 1.6, mb: 1.5 }}
        >
          If you don&#39;t have a ready PDF resume file yet, you can easily
          switch to the `Type Skills` mode.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", lineHeight: 1.6 }}
        >
          Simply enter your information, tech stack, and skills into the text
          box. The AI will use these details to generate your tailored resume,
          cover letter, and match analysis just like it would from a file!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 650,
            bgcolor: COLORS.navy,
            borderRadius: 2,
            "&:hover": { bgcolor: "#121d5c" },
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
