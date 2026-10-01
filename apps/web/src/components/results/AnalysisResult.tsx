"use client";

import { Stack, Paper, Typography } from "@mui/material";
import type { AnalysisResponse } from "../../types/analysis";
import DownloadCvButton from "../ui/DownloadCvButton";
import MatchScoreCard from "../results/MatchScoreCard";
import CompanyResearchCard from "../results/CompanyResearchCard";
import CoverLetterCard from "../results/CoverLetterCard";
import LowMatchWarning from "../results/LowMatchWarning";

interface AnalysisResultProps {
  data: AnalysisResponse;
  photoData?: string | null;
}

export default function AnalysisResult({
  data,
  photoData,
}: AnalysisResultProps) {
  const { match, company, job, tailoredCv, coverLetter } = data;

  const isLowMatch = match.score < 38;

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

          {coverLetter && <CoverLetterCard initialLetter={coverLetter} />}

          {tailoredCv && (
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Tailored CV</Typography>
              <Typography variant="body2" color="text.secondary">
                Generated from your original CV only, without invented facts.
                Check it before sending.
              </Typography>
              {/* Передаємо photoData у кнопку скачування */}
              <DownloadCvButton cv={tailoredCv} photoData={photoData} />
            </Paper>
          )}
        </>
      )}
    </Stack>
  );
}
