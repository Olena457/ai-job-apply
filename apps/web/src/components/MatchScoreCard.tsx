import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { AnalysisResponse } from "../types/analysis";

interface MatchScoreCardProps {
  match: AnalysisResponse["match"];
  job: AnalysisResponse["job"];
}

export default function MatchScoreCard({ match, job }: MatchScoreCardProps) {
  const color =
    match.score >= 75 ? "success" : match.score >= 50 ? "warning" : "error";

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={match.score}
            color={color}
            size={90}
            thickness={5}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {match.score}%
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">
            {job.jobTitle}
            {job.companyName && ` @ ${job.companyName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {match.explanation}
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Matched skills
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
        {match.matchedSkills.map((s) => (
          <Chip
            key={s}
            label={s}
            color="success"
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Missing skills
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        {match.missingSkills.map((s) => (
          <Chip
            key={s}
            label={s}
            color="error"
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
    </Paper>
  );
}
