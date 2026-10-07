
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/constants/theme";

export const THEME_COLORS = [
  { id: "light-blue", hex: "#608abf", name: "Light Blue" },
  { id: "biege", hex: "#b39e9f", name: "Beige" },
  { id: "emerald", hex: "#597b6a", name: "Emerald" },
  { id: "dark-blue", hex: "#153853", name: "Dark Blue" },
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
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        border: `2px dashed ${COLORS.border}`,
        bgcolor: COLORS.lightBg,
        boxSizing: "border-box",

        "&:hover": {
          borderColor: COLORS.navy,
          bgcolor: "rgba(26, 41, 128, 0.04)",
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: COLORS.navy,
          fontSize: "0.875rem",
          mb: 1.5,
        }}
      >
        CV Theme Color
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {THEME_COLORS.map((color) => {
          const isSelected = selectedColor === color.hex;
          return (
            <Box
              key={color.id}
              component="button"
              type="button"
              onClick={() => onChange(color.hex)}
              title={color.name}
              aria-label={`Select ${color.name} theme`}
              sx={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                backgroundColor: color.hex,
                border: "none",
                outline: isSelected
                  ? `2px solid ${color.hex}`
                  : "2px solid transparent",
                outlineOffset: "2px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                p: 0,
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}