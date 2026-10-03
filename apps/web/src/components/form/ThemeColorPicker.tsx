import React from "react";
import { Box, Typography } from "@mui/material";

export const THEME_COLORS = [
  { id: "light-blue", hex: "#5a85b5", name: "Light Blue" }, 
  { id: "dark-blue", hex: "#1e3a8a", name: "Dark Blue" },
  { id: "emerald", hex: "#059669", name: "Emerald" }, 
];

interface ThemeColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

export default function ThemeColorPicker({
  selectedColor,
  onChange,
}: ThemeColorPickerProps) {
  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: "text.secondary", mb: 1.5 }}
      >
        CV Theme Color
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {THEME_COLORS.map((color) => (
          <Box
            key={color.id}
            component="button"
            type="button"
            onClick={() => onChange(color.hex)}
            title={color.name}
            aria-label={`Select ${color.name} theme`}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: color.hex,
              border:
                selectedColor === color.hex
                  ? "2px solid white"
                  : "2px solid transparent",
              outline:
                selectedColor === color.hex ? `2px solid ${color.hex}` : "none",
              boxShadow: selectedColor === color.hex ? 3 : 1,
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              padding: 0,
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: 2,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
