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
        border: `1px dashed ${error ? "red" : "#ccc"}`, 
        borderRadius: 2,
      }}
    >
      <Avatar
        src={photoData || undefined}
        sx={{ width: 64, height: 64, bgcolor: "action.hover" }}
      >
        {!photoData && <ImageIcon size={28} color={error ? "red" : "#999"} />}
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Resume photo(optional)
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            color={error ? "error" : "primary"}
            onClick={() => fileInputRef.current?.click()}
          >
            {photoData ? "Change photo " : "Upload photo"}
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
            sx={{ display: "block", mt: 1 }}
          >
            {error}
          </Typography>
        )}

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}
