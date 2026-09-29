import { Box, Stack, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";

export default function PageHeader() {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          mb: 1.5,
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
        {/* ТУТ ТІЛЬКИ КОРОТКА НАЗВА */}
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 800, color: "#0f172a" }}
        >
          AI Smart Applier-Smart Resume & Application Builder
        </Typography>
      </Stack>
    </Box>
  );
}
