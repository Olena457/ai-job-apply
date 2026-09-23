"use client";

import Button from "@mui/material/Button";

export default function DownloadCvButton() {
  const handleDownload = () => {
    // TODO: Connect this to the actual generated PDF file URL from the backend
    console.log("Triggering CV download...");
    alert("Downloading your tailored CV...");
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleDownload}
      fullWidth
      sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }} 
    >
      Download Tailored CV
    </Button>
  );
}