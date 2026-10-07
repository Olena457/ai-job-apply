"use client";

import { useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput() {
  const [pwd, setPwd] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);


  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem("appPassword") ?? "")
        : "";
    setTimeout(() => {
      setPwd(saved);
    }, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPwd(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("appPassword", val);
    }
  };

  return (
    <Tooltip title="Enter access password for the app">
      <TextField
        size="small"
        variant="outlined"
        placeholder="Password"
        type={show ? "text" : "password"}
        value={pwd}
        onChange={handleChange}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          maxWidth: 200,
          zIndex: 2000,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 2,
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)} edge="end">
                  {show ? (
                    <EyeOff size={20} color="#1A2980" />
                  ) : (
                    <Eye size={20} color="#1A2980" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Tooltip>
  );
}
