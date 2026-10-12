"use client";

import { IconButton, Tooltip, Badge } from "@mui/material";
import { Settings } from "lucide-react";
import { COLORS } from "@/constants/theme";

interface SettingsTriggerProps {
  onClick: () => void;
  configured: boolean;
}

export default function SettingsTrigger({
  onClick,
  configured,
}: SettingsTriggerProps) {
  return (
    <Tooltip title="Settings & API Keys (BYOK)">
      <IconButton
        onClick={onClick}
        aria-label="Settings"
        sx={{
          color: COLORS.navy,
          p: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(45deg)",
            color: COLORS.cyan,
          },
        }}
      >
        <Badge
          variant="dot"
          invisible={!configured}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#10b981",
              boxShadow: "0 0 6px #10b981",
            },
          }}
        >
          <Settings size={23} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
