import { Box, Stack, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";

export default function PageHeader() {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: "#e3f2fd",
            display: "flex",
            color: "#1976d2",
          }}
        >
          <Sparkles size={28} />
        </Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
            fontSize: "clamp(1.25rem, 4.1vw, 1.6rem)",
            lineHeight: 1.3, 
            textAlign: { xs: "left", sm: "center" }, 
          }}
        >
          AI Smart Applier-Smart Resume & Application Builder
        </Typography>
      </Stack>
    </Box>
  );
}
