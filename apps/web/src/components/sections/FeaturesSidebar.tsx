

import { Box, Typography } from "@mui/material";
import { FEATURES } from "@/constants/features";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";

export default function FeaturesSidebar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1.5,
        mb: 3,
        justifyContent: "center",
        width: "100%",
      }}
    >
      {FEATURES.map((item) => {
        const Icon = item.icon;
        return (
          <Box
            key={item.text}
            sx={{
              display: "flex",
              width: { xs: "100%", sm: "260px" },
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: GRADIENTS.blue,
                color: COLORS.lightBg,
                minWidth: 32,
                height: 32,
                borderRadius: 2,
                boxShadow: SHADOWS.icon,
                flexShrink: 0,
                "&:hover": {
                  background: GRADIENTS.mainButtonAnimated,
                },
              }}
            >
              <Icon size={20} strokeWidth={2} />
            </Box>

            <Box
              component="button"
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                bgcolor: COLORS.lightBg,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                border: `1px solid ${COLORS.border}`,
                transition: "all 0.2s ease",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: SHADOWS.featureHover,

                "&:hover": {
                  borderColor: COLORS.borderHover,
                  background: GRADIENTS.body,
                  transform: "translateY(-2px)",
                },

                "&:focus-visible": {
                  outline: `2px solid ${COLORS.primary}`,
                  outlineOffset: "2px",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontSize: "0.8rem",
                  lineHeight: 1.2,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}