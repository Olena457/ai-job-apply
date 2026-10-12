"use client";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Link,
} from "@mui/material";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { COLORS } from "@/constants/theme";
import { ByokTabProps } from "@/types/settings";

export default function ByokTab({
  keys,
  updateKey,
  showGemini,
  setShowGemini,
  showTavily,
  setShowTavily,
  showOpenRouter,
  setShowOpenRouter,
}: ByokTabProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Alert
        severity="info"
        sx={{ borderRadius: 2, fontSize: "0.825rem", py: 0.5 }}
      >
        Your API keys are stored <strong>only in your browser</strong> and sent
        directly for processing.
      </Alert>

      {/* Gemini API Key */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: COLORS.navy }}
          >
            Google Gemini API Key{" "}
            <span style={{ color: COLORS.asterisk }}>*</span>
          </Typography>
          <Link
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.75rem",
              color: COLORS.primary,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Get free key <ExternalLink size={12} />
          </Link>
        </Box>
        <TextField
          fullWidth
          size="small"
          type={showGemini ? "text" : "password"}
          value={keys.geminiApiKey}
          onChange={(e) => updateKey("geminiApiKey", e.target.value)}
          placeholder="AIzaSy..."
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowGemini(!showGemini)}
                    edge="end"
                    size="small"
                  >
                    {showGemini ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Tavily API Key */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: COLORS.navy }}
          >
            Tavily API Key{" "}
            <span style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>
              (recommended)
            </span>
          </Typography>
          <Link
            href="https://tavily.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.75rem",
              color: COLORS.primary,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            1,000 free searches <ExternalLink size={12} />
          </Link>
        </Box>
        <TextField
          fullWidth
          size="small"
          type={showTavily ? "text" : "password"}
          value={keys.tavilyApiKey}
          onChange={(e) => updateKey("tavilyApiKey", e.target.value)}
          placeholder="tvly-..."
          helperText="Used for company background research (culture, employee reviews, industry)"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowTavily(!showTavily)}
                    edge="end"
                    size="small"
                  >
                    {showTavily ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* OpenRouter API Key */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: COLORS.navy }}
          >
            OpenRouter API Key{" "}
            <span style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>
              (optional)
            </span>
          </Typography>
          <Link
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.75rem",
              color: COLORS.primary,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            OpenRouter Keys <ExternalLink size={12} />
          </Link>
        </Box>
        <TextField
          fullWidth
          size="small"
          type={showOpenRouter ? "text" : "password"}
          value={keys.openRouterApiKey}
          onChange={(e) => updateKey("openRouterApiKey", e.target.value)}
          placeholder="sk-or-..."
          helperText="Fallback model in case of high traffic or Gemini rate limits"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOpenRouter(!showOpenRouter)}
                    edge="end"
                    size="small"
                  >
                    {showOpenRouter ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Google Sheets Webhook URL */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: COLORS.navy, mb: 0.5 }}
        >
          Google Apps Script URL{" "}
          <span style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>
            (optional)
          </span>
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={keys.googleScriptUrl}
          onChange={(e) => updateKey("googleScriptUrl", e.target.value)}
          placeholder="https://script.google.com/macros/s/.../exec"
          helperText="For automatically recording job applications in your own Google Sheet"
        />
      </Box>
    </Box>
  );
}
