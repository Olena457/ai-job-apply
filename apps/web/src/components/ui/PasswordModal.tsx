
"use client";

import { useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Eye, EyeOff, ShieldLock } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";

export default function PasswordModal() {
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("appPassword") ?? "";
      setTimeout(() => {
        setPwd(saved);
      }, 0);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPwd(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("appPassword", val);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Access Password">
        <IconButton onClick={() => setOpen(true)} sx={{ color: COLORS.navy }}>
          <ShieldLock size={24} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pb: 1, color: COLORS.navy, fontWeight: 700 }}>
          App Access
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2, fontSize: "0.875rem" }}>
            Enter the password to enable AI processing and API access.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Password"
            type={show ? "text" : "password"}
            value={pwd}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: COLORS.cyan,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow(!show)}
                      edge="end"
                      size="small"
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={handleClose}
            variant="contained"
            disableElevation
            sx={{
              background: GRADIENTS.mainButtonAnimated,
              backgroundSize: "200% auto",
              color: COLORS.lightBg,
              transition: "0.5s",
              textTransform: "uppercase",
              fontWeight: 600,
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                backgroundPosition: "right center",
                boxShadow: SHADOWS.btnGradHover,
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}