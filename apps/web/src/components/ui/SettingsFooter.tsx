"use client";

import { DialogActions, Button, Box } from "@mui/material";
import { Trash2 } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";

interface SettingsFooterProps {
  onClear: () => void;
  onClose: () => void;
  onSave: () => void;
}

export default function SettingsFooter({
  onClear,
  onClose,
  onSave,
}: SettingsFooterProps) {
  return (
    <DialogActions sx={{ p: 3, pt: 1, justifyContent: "space-between" }}>
      <Button
        onClick={onClear}
        color="error"
        size="small"
        startIcon={<Trash2 size={16} />}
        sx={{ textTransform: "none", fontSize: "0.825rem" }}
      >
        Clear All
      </Button>

      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            borderColor: COLORS.border,
            color: COLORS.textPrimary,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onSave}
          variant="contained"
          sx={{
            background: GRADIENTS.mainButtonAnimated,
            backgroundSize: "200% auto",
            color: COLORS.lightBg,
            transition: "0.5s",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            "&:hover": {
              backgroundPosition: "right center",
              boxShadow: SHADOWS.btnGradHover,
            },
          }}
        >
          Save
        </Button>
      </Box>
    </DialogActions>
  );
}
