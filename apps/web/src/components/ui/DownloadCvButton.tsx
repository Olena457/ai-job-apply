"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import type { TailoredCv } from "../../types/analysis";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";


interface DownloadCvButtonProps {
  cv: TailoredCv;
  photoData?: string | null;
  themeColor?: string; 
}

export default function DownloadCvButton({
  cv,
  photoData,
  themeColor, 
}: DownloadCvButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    setBusy(true);
    try {
      const [{ pdf }, { default: CvDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../results/CvDocument"),
      ]);

      const blob = await pdf(
        <CvDocument cv={cv} photoData={photoData} themeColor={themeColor} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cv.fullName.replace(/\s+/g, "_")}_Tailored_CV.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleDownload}
      disabled={busy}
      fullWidth
      sx={{
        mt: 2, 
        py: 1.2,
        px: 3,
        fontWeight: 700,
        fontSize: "1.05rem",
        textTransform: "none",
        borderRadius: 2,
        background: GRADIENTS.mainButtonAnimated,
        backgroundSize: "200% auto",
        color: COLORS.lightBg,
        boxShadow: SHADOWS.btnGrad,
        transition: "0.5s ease",

        "&:hover": {
          backgroundPosition: "right center",
          boxShadow: SHADOWS.btnGradHover,
        },

        "&.Mui-disabled": {
          background: COLORS.disabledBg,
          color: COLORS.textMuted,
          boxShadow: "none",
          backgroundSize: "auto",
        },
      }}
    >
      {busy ? "Generating PDF..." : "Download Tailored CV"}
    </Button>
  );
}
