import { TextField } from "@mui/material";

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
      sx={{
        "& .MuiOutlinedInput-root": {
          fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
        },
        "& .MuiOutlinedInput-input": {
          py: 1.5,
        },
        "& .MuiInputLabel-root": {
          fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
          top: "-2px",
          "&.MuiInputLabel-shrink": {
            top: 0,
          },
        },
      }}
    />
  );
}
