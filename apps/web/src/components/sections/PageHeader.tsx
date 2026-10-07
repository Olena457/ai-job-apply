
import { Box, Typography } from "@mui/material";
import LogoIcon from "../ui/LogoIcon";
import PasswordModal from "../ui/PasswordModal";
import { COLORS, GRADIENTS } from "@/constants/theme";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            fontWeight: 800,
            color: COLORS.navy || "#1A2980",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            letterSpacing: "-0.5px",
          }}
        >
          <Box
            component="span"
            sx={{
              background:
                GRADIENTS.mainButtonAnimated ||
                "linear-gradient(to right, #1A2980 0%, #26D0CE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mr: 0.5,
            }}
          >
            AI
          </Box>
          Smart Applier
        </Typography>
      </Box>

      <PasswordModal />
    </Box>
  );
}
