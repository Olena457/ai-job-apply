
import { TextField } from "@mui/material";
import { COLORS } from "@/constants/theme"; 

interface CompanyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanyInput({ value, onChange }: CompanyInputProps) {
  return (
    <TextField
      id="companyName"
      label="Company Name or URL"
      placeholder="e.g., Google or https://google.com"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
      required
      sx={{
        "& .MuiFormLabel-asterisk": {
          color: COLORS.asterisk || "#d32f2f",
        },
        "& .MuiOutlinedInput-root": {
          height: "53px", 
          fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
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
        "& .MuiInputLabel-root": {
          fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
          top: "-1px", 
          color: "text.secondary",
          "&.Mui-focused": {
            color: COLORS.navy || "#1A2980", 
          },
          "&.MuiInputLabel-shrink": {
            top: 2, 
          },
        },
      }}
    />
  );
}