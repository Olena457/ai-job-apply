
import { Box, Typography } from "@mui/material";
import LogoIcon from "../ui/LogoIcon";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
        
          width: { xs: 26, sm: 38, md: 42 },
          height: { xs: 26, sm: 38, md: 42 },
          flexShrink: 0,
        }}
      >
        <LogoIcon />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#1e293b",
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        AI Smart Applier
      </Typography>
    </Box>
  );
}