
"use client";

import React, { useRef } from "react";
import { Box, Button, Avatar, Typography, IconButton } from "@mui/material";
import { Image as ImageIcon, X } from "lucide-react";

interface PhotoUploaderProps {
  photoData: string | null;
  error?: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}

export default function PhotoUploader({
  photoData,
  error,
  onUpload,
  onClear,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        border: `1.5px dashed ${error ? "red" : "#cbd5e1"}`,
        borderRadius: 2,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Avatar
        src={photoData || undefined}
        sx={{ width: 64, height: 64, bgcolor: "action.hover", flexShrink: 0 }}
      >
        {!photoData && <ImageIcon size={28} color={error ? "red" : "#999"} />}
      </Avatar>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
            mb: 1,
            textAlign: "center",
            alignSelf: "flex-start",
          }}
        >
          Resume photo <br />
          <Box sx={{ fontSize: "0.85em", fontWeight: 400 }}>
            ( jpg, jpeg, png)
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            color={error ? "error" : "primary"}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "clamp(0.65rem, 2vw, 0.675rem)",
            }}
          >
            {photoData ? "Change" : "Upload photo"}
          </Button>

          {photoData && (
            <IconButton
              size="small"
              color="error"
              onClick={onClear}
              title="Delete photo"
            >
              <X size={20} />
            </IconButton>
          )}
        </Box>

        {error && (
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", mt: 0.5 }}
          >
            {error}
          </Typography>
        )}

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}