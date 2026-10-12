"use client";

import { DialogTitle, Box, Typography } from "@mui/material";
import { Settings } from "lucide-react";
import { COLORS, GRADIENTS } from "@/constants/theme";

export default function SettingsHeader() {
  return (
    <DialogTitle
      sx={{
        pb: 1,
        pt: 2.5,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: GRADIENTS.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <Settings size={20} />
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: COLORS.navy, fontSize: "1.1rem" }}
          >
            Access Settings
          </Typography>
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>
            Bring Your Own Key (BYOK) or Administrator Login
          </Typography>
        </Box>
      </Box>
    </DialogTitle>
  );
}
