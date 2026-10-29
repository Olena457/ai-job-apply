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
    <DialogActions
      sx={{
        p: { xs: 2, sm: 3 },
        pt: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        onClick={onClear}
        color="error"
        size="small"
        startIcon={<Trash2 size={16} />}
        sx={{
          textTransform: "none",
          fontSize: { xs: "0.75rem", sm: "0.825rem" },
          px: { xs: 1, sm: 1.5 },
          minWidth: "auto",
        }}
      >
        Clear
      </Button>

      <Box
        sx={{ display: "flex", gap: { xs: 1, sm: 1.5 }, alignItems: "center" }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            borderColor: COLORS.border,
            color: COLORS.textPrimary,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.5, sm: 1 },
            minWidth: "auto",
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
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 1 },
            minWidth: "auto",
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
