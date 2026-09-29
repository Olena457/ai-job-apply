"use client";

import { Stack, Paper, Typography } from "@mui/material";
import type { AnalysisResponse } from "../../types/analysis";
import DownloadCvButton from "../ui/DownloadCvButton";
import MatchScoreCard from "../results/MatchScoreCard";
import CompanyResearchCard from "../results/CompanyResearchCard";
import CoverLetterCard from "../results/CoverLetterCard";
import LowMatchWarning from "../results/LowMatchWarning";

export default function AnalysisResult({ data }: { data: AnalysisResponse }) {
  const { match, company, job, tailoredCv, coverLetter } = data;

  const isLowMatch = match.score < 38;

  return (
    <Stack
      spacing={3}
      sx={{ maxWidth: 800, mx: "auto", mt: 4, textAlign: "left" }}
    >
      <MatchScoreCard match={match} job={job} />

      {isLowMatch ? (
        <LowMatchWarning />
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
              <DownloadCvButton cv={tailoredCv} />
            </Paper>
          )}
        </>
      )}
    </Stack>
  );
}
