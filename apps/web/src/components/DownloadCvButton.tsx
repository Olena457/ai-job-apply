"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import type { TailoredCv } from "../types/analysis";

export default function DownloadCvButton({ cv }: { cv: TailoredCv }) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    setBusy(true);
    try {
      const [{ pdf }, { default: CvDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../components/CvDocument"),
      ]);

      const blob = await pdf(<CvDocument cv={cv} />).toBlob();
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
      sx={{ mt: 2, py: 1.5, fontWeight: "bold", borderRadius: 2 }}
    >
      {busy ? "Generating PDF..." : "Download Tailored CV"}
    </Button>
  );
}
