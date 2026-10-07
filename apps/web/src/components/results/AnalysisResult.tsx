"use client";

import { useState } from "react";
import {
  Stack,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { AnalysisResponse } from "../../types/analysis";
import DownloadCvButton from "../ui/DownloadCvButton";
import MatchScoreCard from "../results/MatchScoreCard";
import CompanyResearchCard from "../results/CompanyResearchCard";
import CoverLetterCard from "../results/CoverLetterCard";
import LowMatchWarning from "../results/LowMatchWarning";
import SaveToSheetsButton from "../results/SaveToSheetsButton";
import { generateCoverLetter, generateTailoredCv } from "../../lib/api";
import { COLORS } from "@/constants/theme";

interface AnalysisResultProps {
  data: AnalysisResponse;
  photoData?: string | null;
  themeColor?: string; 
}

export default function AnalysisResult({
  data,
  photoData,
  themeColor, 
}: AnalysisResultProps) {
  const { match, company, job } = data;

  const [coverLetter, setCoverLetter] = useState(data.coverLetter);
  const [tailoredCv, setTailoredCv] = useState(data.tailoredCv);

  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);

  const [clError, setClError] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const isLowMatch = match.score < 38;

  const handleGenerateCL = async () => {
    setIsGeneratingCL(true);
    setClError(null);
    try {
      const res = await generateCoverLetter(
        data.cvText,
        data.jobDescription,
        data.job,
        data.company,
        data.match,
      );
      if (res.coverLetter) setCoverLetter(res.coverLetter);
    } catch (err) {
      setClError(
        err instanceof Error ? err.message : "Error generating Cover Letter",
      );
    } finally {
      setIsGeneratingCL(false);
    }
  };

  const handleGenerateCV = async () => {
    setIsGeneratingCV(true);
    setCvError(null);
    try {
      const res = await generateTailoredCv(
        data.cvText,
        data.jobDescription,
        data.job,
        data.match,
      );
      if (res.tailoredCv) setTailoredCv(res.tailoredCv);
    } catch (err) {
      setCvError(err instanceof Error ? err.message : "Error generating CV");
    } finally {
      setIsGeneratingCV(false);
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{ maxWidth: 800, mx: "auto", mt: 4, textAlign: "left" }}
    >
      <MatchScoreCard match={match} job={job} />

      {isLowMatch ? (
        <LowMatchWarning score={match.score} />
      ) : (
        <>
          {company && <CompanyResearchCard company={company} />}

          {coverLetter ? (
            <CoverLetterCard initialLetter={coverLetter} />
          ) : (
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Cover Letter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generate a unique cover letter tailored specifically for this
                position.
              </Typography>
              {clError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {clError}
                </Alert>
              )}
              <Button
                variant="outlined"
                onClick={handleGenerateCL}
                disabled={isGeneratingCL}
                startIcon={
                  isGeneratingCL && (
                    <CircularProgress size={20} color="inherit" />
                  )
                }
                sx={{
                  color: COLORS.navy, 
                  borderColor: COLORS.navy,
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  transition: "all 0.2s ease",

                  "&:hover": {
                    borderColor: COLORS.navy,
                    bgcolor: "rgba(26, 41, 128, 0.05)", 
                  },

                  "&.Mui-disabled": {
                    borderColor: COLORS.disabledBg,
                    color: COLORS.textMuted,
                  },
                }}
              >
                {isGeneratingCL ? "Generating..." : "Generate Cover Letter"}
              </Button>
            </Paper>
          )}

          {tailoredCv ? (
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Tailored CV</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generated from your original CV only, without invented facts.
                Check it before sending.
              </Typography>
              <DownloadCvButton
                cv={tailoredCv}
                photoData={photoData}
                themeColor={themeColor}
              />
            </Paper>
          ) : (
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Tailored CV
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Optimize and rephrase your CV to match the requirements of this
                job.
              </Typography>
              {cvError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {cvError}
                </Alert>
              )}
              <Button
                variant="outlined"
                onClick={handleGenerateCV}
                disabled={isGeneratingCV}
                startIcon={
                  isGeneratingCV && (
                    <CircularProgress size={20} color="inherit" />
                  )
                }
                sx={{
                  color: COLORS.navy,
                  borderColor: COLORS.navy,
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  transition: "all 0.2s ease",

                  "&:hover": {
                    borderColor: COLORS.navy,
                    bgcolor: "rgba(26, 41, 128, 0.05)", 
                  },

                  "&.Mui-disabled": {
                    borderColor: COLORS.disabledBg,
                    color: COLORS.textMuted,
                  },
                }}
              >
                {isGeneratingCV ? "Tailoring CV..." : "Generate Tailored CV"}
              </Button>
            </Paper>
          )}
        </>
      )}

      <SaveToSheetsButton
        companyName={
          company?.summary !== "No public information found." &&
          data.companyName
            ? data.companyName
            : job?.companyName || "Unknown Company"
        }
        jobTitle={job?.jobTitle}
        jobUrl={company?.website !== "unknown" ? company?.website : ""}
        matchScore={match.score}
      />
    </Stack>
  );
}
