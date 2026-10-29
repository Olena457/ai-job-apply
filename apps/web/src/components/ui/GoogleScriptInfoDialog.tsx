
"use client";

import { useState } from "react";
import { Typography, Button, Paper} from "@mui/material";
import { Copy, Check } from "lucide-react";
import ProfileSourceDialog from "@/components/ui/ProfileSourceDialog";
import { COLORS } from "@/constants/theme";

const googleScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reviews");
    var data = JSON.parse(e.postData.contents);
    
    var nextNumber = sheet.getLastRow() - 1;
    
    var newRow = [
      nextNumber,
      data.companyName || '',
      data.jobUrl || '',
      data.date || new Date().toLocaleDateString('uk-UA'),
      '',
      '',
      '',
      data.matchScore ? (data.matchScore + '%') : '',
      '',
      '',
      '',
      ''
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reviews");
    var lastRow = sheet.getLastRow();
    
    if (lastRow <= 2) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var limit = 6;
    var numRowsToFetch = Math.min(limit, lastRow - 2);
    var startRow = lastRow - numRowsToFetch + 1;
    
    var range = sheet.getRange(startRow, 1, numRowsToFetch, 12);
    var values = range.getValues();
    
    var result = values.map(function(row) {
      return {
        id: row[0],
        companyName: row[1],
        jobUrl: row[2],
        date: row[3],
        matchScore: row[7]
      };
    });
    
    result.reverse();
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

interface GoogleScriptInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function GoogleScriptInfoDialog({
  open,
  onClose,
}: GoogleScriptInfoDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(googleScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ProfileSourceDialog
      open={open}
      onClose={onClose}
      title="Google Apps Script Setup"
    >
      <Typography
        variant="body2"
        sx={{ color: "text.primary", lineHeight: 1.6, mb: 1 }}
      >
        Make sure your Google Sheet contains a tab named
        <strong>&quot;Reviews&quot;</strong> with columns:
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontSize: "0.8rem",
          lineHeight: 1.5,
          mb: 1.5,
        }}
      >
        Automated columns filled by the script:
        <br />• <strong>Col A:</strong> № (Auto ID)
        <br />• <strong>Col B:</strong> Company
        <br />• <strong>Col C:</strong> Link to the job position
        <br />• <strong>Col D:</strong> Date
        <br />• <strong>Col H:</strong> percentage % of match the position
        <br />
        <br />
        <em>
          This is the minimum columns are required for the script to correctly
          write and fetch application history.
        </em>
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.primary", lineHeight: 1.6, mb: 1 }}
      >
        Copy and paste the script below into{" "}
        <strong>Extensions → Apps Script</strong> in your sheet, then deploy it
        as a Web App (access set to <em>&quot;Anyone&quot;</em>):
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          bgcolor: COLORS.disabledBg || "#f8fafc",
          borderRadius: 2,
          maxHeight: "180px",
          overflowY: "auto",
          mb: 2,
        }}
      >
        <pre
          style={{
            margin: 0,
            fontSize: "0.725rem",
            fontFamily: "monospace",
            color: COLORS.textPrimary,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {googleScriptCode}
        </pre>
      </Paper>

      <Button
        variant="outlined"
        fullWidth
        startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
        onClick={handleCopy}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderColor: COLORS.navy,
          color: COLORS.navy,
          borderRadius: 2,
          "&:hover": {
            bgcolor: "rgba(26, 41, 128, 0.04)",
          },
        }}
      >
        {copied ? "Copied to Clipboard!" : "Copy Script"}
      </Button>
    </ProfileSourceDialog>
  );
}