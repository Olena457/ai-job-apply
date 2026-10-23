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
  CircularProgress,
} from "@mui/material";
import { History, X, RefreshCw } from "lucide-react";
import { COLORS, SHADOWS } from "@/constants/theme";
import { useHistory } from "@/hooks/useHistory";
import { ApplicationRecord } from "@/types/history"; 
import HistoryItem from "./HistoryItem";

export default function HistoryModal() {
  const [open, setOpen] = useState(false);
  const { history, loading, error, fetchHistory } = useHistory();

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
              <Typography variant="body2">No saved history found.</Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {history.map((item: ApplicationRecord, idx: number) => (
                <HistoryItem key={idx} item={item} />
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
