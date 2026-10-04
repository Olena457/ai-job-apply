
import { Box, Typography } from "@mui/material";
import { FEATURES } from "@/constants/features";

export default function FeaturesSidebar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", 
        gap: 1.5,
        mb: 4,
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
                bgcolor: "#31a6ed",
                color: "#ffffff",
                minWidth: 42,
                height: 42,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                flexShrink: 0,
              }}
            >
              <Icon size={20} strokeWidth={2.5} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1, 
                bgcolor: "#e9eff4",
                px: 1.5,
                py: 1,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  bgcolor: "#f1f5f9",
                  transform: "translateY(-2px)", 
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#334155",
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