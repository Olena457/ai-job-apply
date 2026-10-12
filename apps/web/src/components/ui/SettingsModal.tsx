"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Typography,
  Box,
  Tabs,
  Tab,
  InputAdornment,
  Tooltip,
  Alert,
  Link,
  Badge,
} from "@mui/material";
import {
  Settings,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";
import {
  getUserApiKeys,
  saveUserApiKeys,
  isAppConfigured,
  UserApiKeys,
} from "@/lib/keysStorage";

export default function SettingsModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [configured, setConfigured] = useState(false);

  const [keys, setKeys] = useState<UserApiKeys>({
    geminiApiKey: "",
    tavilyApiKey: "",
    openRouterApiKey: "",
    googleScriptUrl: "",
    appPassword: "",
  });

  const [showGemini, setShowGemini] = useState(false);
  const [showTavily, setShowTavily] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = getUserApiKeys();
      setKeys(stored);
      setConfigured(isAppConfigured());
      // If user only has appPassword, open admin tab by default
      if (stored.appPassword && !stored.geminiApiKey) {
        setActiveTab(1);
      }
    }
  }, [open]);

  const handleSave = () => {
    saveUserApiKeys(keys);
    setConfigured(isAppConfigured());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setOpen(false);
    }, 600);
  };

  const handleClear = () => {
    const emptyKeys: UserApiKeys = {
      geminiApiKey: "",
      tavilyApiKey: "",
      openRouterApiKey: "",
      googleScriptUrl: "",
      appPassword: "",
    };
    setKeys(emptyKeys);
    saveUserApiKeys(emptyKeys);
    setConfigured(false);
  };

  return (
    <>
      <Tooltip title="Налаштування та API ключі (BYOK)">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            color: COLORS.navy,
            p: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "rotate(45deg)",
              color: COLORS.cyan,
            },
          }}
        >
          <Badge
            variant="dot"
            invisible={!configured}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#10b981",
                boxShadow: "0 0 6px #10b981",
              },
            }}
          >
            <Settings size={23} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: SHADOWS.card,
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            pt: 2.5,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: GRADIENTS.blue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Settings size={20} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.navy, fontSize: "1.1rem" }}>
                Налаштування доступу
              </Typography>
              <Typography variant="caption" sx={{ color: COLORS.textMuted }}>
                Bring Your Own Key (BYOK) або вхід адміністратора
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <Box sx={{ px: 3, borderBottom: `1px solid ${COLORS.border}` }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: COLORS.cyan,
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: COLORS.textMuted,
                "&.Mui-selected": {
                  color: COLORS.navy,
                },
              },
            }}
          >
            <Tab icon={<KeyRound size={17} />} iconPosition="start" label="Власні ключі (BYOK)" />
            <Tab icon={<ShieldCheck size={17} />} iconPosition="start" label="Адміністратор" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 3, pt: 2.5 }}>
          {saveSuccess && (
            <Alert
              icon={<CheckCircle2 size={20} />}
              severity="success"
              sx={{ mb: 2, borderRadius: 2 }}
            >
              Налаштування успішно збережено!
            </Alert>
          )}

          {activeTab === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Alert severity="info" sx={{ borderRadius: 2, fontSize: "0.825rem", py: 0.5 }}>
                Ваші ключі зберігаються <strong>лише у вашому браузері</strong> та використовуються для прямих запитів до нейромереж.
              </Alert>

              {/* Gemini API Key */}
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.navy }}>
                    Google Gemini API Key <span style={{ color: COLORS.asterisk }}>*</span>
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
                    Отримати безкоштовно <ExternalLink size={12} />
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  type={showGemini ? "text" : "password"}
                  value={keys.geminiApiKey}
                  onChange={(e) => setKeys({ ...keys, geminiApiKey: e.target.value })}
                  placeholder="AIzaSy..."
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowGemini(!showGemini)} edge="end" size="small">
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.navy }}>
                    Tavily API Key <span style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>(рекомендовано)</span>
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
                    1000 безкоштовних пошуків <ExternalLink size={12} />
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  type={showTavily ? "text" : "password"}
                  value={keys.tavilyApiKey}
                  onChange={(e) => setKeys({ ...keys, tavilyApiKey: e.target.value })}
                  placeholder="tvly-..."
                  helperText="Потрібен для дослідження компанії (культура, відгуки, індустрія)"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowTavily(!showTavily)} edge="end" size="small">
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.navy }}>
                    OpenRouter API Key <span style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>(опціонально)</span>
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
                  onChange={(e) => setKeys({ ...keys, openRouterApiKey: e.target.value })}
                  placeholder="sk-or-..."
                  helperText="Резервна модель у разі високого навантаження або таймаутів Gemini"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowOpenRouter(!showOpenRouter)} edge="end" size="small">
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
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.navy, mb: 0.5 }}>
                  Google Apps Script URL <span style={{ color: COLORS.textMuted, fontSize: "0.75rem" }}>(опціонально)</span>
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={keys.googleScriptUrl}
                  onChange={(e) => setKeys({ ...keys, googleScriptUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  helperText="Для автоматичного запису вакансій у власну таблицю"
                />
              </Box>
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Alert severity="warning" sx={{ borderRadius: 2, fontSize: "0.825rem", py: 0.5 }}>
                Цей розділ призначений для власниці сервісу. Введення пароля дозволяє використовувати заздалегідь налаштовані серверні ключі.
              </Alert>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: COLORS.navy, mb: 0.5 }}>
                  Пароль адміністратора
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={keys.appPassword}
                  onChange={(e) => setKeys({ ...keys, appPassword: e.target.value })}
                  placeholder="Введіть ваш пароль..."
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1, justifyContent: "space-between" }}>
          <Button
            onClick={handleClear}
            color="error"
            size="small"
            startIcon={<Trash2 size={16} />}
            sx={{ textTransform: "none", fontSize: "0.825rem" }}
          >
            Очистити все
          </Button>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                borderColor: COLORS.border,
                color: COLORS.textPrimary,
              }}
            >
              Скасувати
            </Button>

            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                background: GRADIENTS.mainButtonAnimated,
                backgroundSize: "200% auto",
                color: COLORS.lightBg,
                transition: "0.5s",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                "&:hover": {
                  backgroundPosition: "right center",
                  boxShadow: SHADOWS.btnGradHover,
                },
              }}
            >
              Зберегти
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
