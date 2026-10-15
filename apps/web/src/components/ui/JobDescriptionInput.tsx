import { TextField, IconButton, InputAdornment } from "@mui/material";
import { X } from "lucide-react";
import { COLORS } from "@/constants/theme";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({
  value,
  onChange,
}: JobDescriptionInputProps) {
  return (
    <TextField
      id="jobDescription"
      label="Job Description or Requirements"
      placeholder="Paste the full job description here..."
      multiline
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      fullWidth
      slotProps={{
        input: {
          endAdornment: value ? (
            <InputAdornment
              position="end"
              sx={{ alignItems: "flex-start", pt: 1.5 }}
            >
              <IconButton
                aria-label="clear job description"
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
        "& .MuiFormLabel-asterisk": {
          color: COLORS.asterisk || "#d32f2f",
        },
        "& .MuiOutlinedInput-root": {
          fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
          "& fieldset": {
            borderColor: COLORS.border || "#cbd5e1",
            borderWidth: "1.5px",
          },
          "&:hover fieldset": {
            borderColor: COLORS.borderHover || "#94a3b8",
          },
          "&.Mui-focused fieldset": {
            borderColor: COLORS.navy || "#1A2980",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
          color: "text.secondary",
          "&.Mui-focused": {
            color: COLORS.navy || "#1A2980",
          },
        },
      }}
    />
  );
}
