
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { COLORS } from "@/constants/theme";

interface CompanyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanyInput({ value, onChange }: CompanyInputProps) {
  return (
    <Box sx={{ textAlign: "left", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "7px",
          mb: 1.4,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: COLORS.navy,
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
          }}
        >
          Company Name or URL
          <span
            style={{ color: COLORS.asterisk || "#d32f2f", marginLeft: "2px" }}
          >
            *
          </span>
        </Typography>
      </Box>

      <TextField
        id="companyName"
        placeholder="e.g., Google or https://google.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        variant="outlined"
        required
        slotProps={{
          input: {
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear company name"
                  onClick={() => onChange("")}
                  edge="end"
                  size="small"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: COLORS.navy || "#1A2980" },
                  }}
                >
                  <X size={18} />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{
          width: "100%",
          display: "block",
          "& .MuiOutlinedInput-root": {
            height: "45px", 
            fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
            borderRadius: 2,
            width: "100%",
            "& fieldset": {
              borderColor: COLORS.border || "#cbd5e1",
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: COLORS.borderHover,
            },
            "&.Mui-focused fieldset": {
              borderColor: COLORS.navy || "#1A2980",
            },
          },
        }}
      />
    </Box>
  );
}