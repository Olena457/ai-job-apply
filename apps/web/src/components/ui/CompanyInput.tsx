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
      placeholder="e.g., Google or https://google.com (optional but recommended)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
    />
  );
}
