import { Box, Stack, Typography } from "@mui/material";
import { FEATURES } from "@/constants/features";

export default function FeaturesSidebar() {
  return (
    <Stack spacing={2.5}>
      {FEATURES.map((item) => {
        const Icon = item.icon;
        return (
          <Stack
            key={item.text}
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: "10px",
                bgcolor: "#ffffff",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1976d2",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                flexShrink: 0,
              }}
            >
              <Icon size={18} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#334155",
                lineHeight: 1.4,
              }}
            >
              {item.text}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
