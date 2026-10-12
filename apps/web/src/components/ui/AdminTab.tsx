"use client";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { COLORS } from "@/constants/theme";
import { AdminTabProps } from "@/types/settings";

export default function AdminTab({
  keys,
  updateKey,
  showPassword,
  setShowPassword,
}: AdminTabProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Alert
        severity="warning"
        sx={{ borderRadius: 2, fontSize: "0.825rem", py: 0.5 }}
      >
        This section is for the application owner. Entering the administrator
        password enables pre-configured server-side API keys.
      </Alert>

      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: COLORS.navy, mb: 0.5 }}
        >
          Administrator Password
        </Typography>
        <TextField
          fullWidth
          size="small"
          type={showPassword ? "text" : "password"}
          value={keys.appPassword}
          onChange={(e) => updateKey("appPassword", e.target.value)}
          placeholder="Enter administrator password..."
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
