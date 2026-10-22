"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { History, X, ExternalLink, RefreshCw } from "lucide-react";
import { COLORS, SHADOWS } from "@/constants/theme";
import { getUserApiKeys } from "@/lib/keysStorage";

interface ApplicationRecord {
  companyName: string;
  jobTitle?: string;
  jobUrl?: string;
  matchScore: number;
  date?: string;
}

export default function HistoryModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ApplicationRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    const { googleScriptUrl } = getUserApiKeys();

    if (!googleScriptUrl) {
      setError("Google Sheets URL is not configured in Settings.");
      loadFromLocalStorage();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(googleScriptUrl);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      const parsedData = Array.isArray(data) ? data : [];
      setHistory(parsedData);
      localStorage.setItem("app_history", JSON.stringify(parsedData));
    } catch {
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const localData = localStorage.getItem("app_history");
    if (localData) {
      try {
        setHistory(JSON.parse(localData));
      } catch {
        setError(
          "Could not fetch history from Google Sheets or local storage.",
        );
      }
    } else {
      setError("No saved history found.");
    }
  };

  const handleOpen = () => {
    setOpen(true);
    fetchHistory();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Application History">
        <IconButton onClick={handleOpen} sx={{ color: COLORS.navy }}>
          <History size={24} />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: SHADOWS.card,
              maxHeight: "80vh",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: COLORS.navy,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <History size={20} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Application History
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={fetchHistory} disabled={loading}>
              <RefreshCw size={18} />
            </IconButton>
            <IconButton size="small" onClick={handleClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={32} />
            </Box>
          ) : error && history.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
              <Typography variant="body2">{error}</Typography>
            </Box>
          ) : history.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body2">
                No saved applications found.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {history.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${COLORS.border}`,
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ minWidth: 0, pr: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700 }}
                      noWrap
                    >
                      {item.companyName}
                    </Typography>
                    {item.jobTitle && (
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {item.jobTitle}
                      </Typography>
                    )}
                    {item.date && (
                      <Typography variant="caption" color="text.disabled">
                        {item.date}
                      </Typography>
                    )}
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Chip
                      label={`${item.matchScore}%`}
                      size="small"
                      color={item.matchScore >= 70 ? "success" : "default"}
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                    {item.jobUrl && item.jobUrl.startsWith("http") && (
                      <IconButton
                        size="small"
                        component="a"
                        href={item.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
