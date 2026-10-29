

"use client";

import { DialogTitle, Box, Typography, IconButton } from "@mui/material";
import { Settings, X } from "lucide-react";
import { COLORS, GRADIENTS } from "@/constants/theme";

interface SettingsHeaderProps {
  onClose: () => void;
}

export default function SettingsHeader({ onClose }: SettingsHeaderProps) {
  return (
    <DialogTitle
      sx={{
        pb: 1,
        pt: { xs: 2, sm: 2.5 },
        px: { xs: 2, sm: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5 },
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 30, sm: 36 },
            height: { xs: 30, sm: 36 },
            borderRadius: "50%",
            background: GRADIENTS.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <Settings size={18} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: COLORS.navy,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              lineHeight: 1.4,
            }}
          >
            Access Settings
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: COLORS.textMuted,
              fontSize: { xs: "0.68rem", sm: "0.75rem" },
              display: "block",
              lineHeight: 1.4,
            }}
          >
            Bring Your Own Key or Administrator Login
          </Typography>
        </Box>
      </Box>

      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          color: COLORS.navy,
          p: 0.5,
          flexShrink: 0,
          "&:hover": {
            bgcolor: COLORS.disabledBg,
          },
        }}
        aria-label="Close settings"
      >
        <X size={18} />
      </IconButton>
    </DialogTitle>
  );
}
