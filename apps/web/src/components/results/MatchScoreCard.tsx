
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { AnalysisResponse } from "../../types/analysis";

interface MatchScoreCardProps {
  match: AnalysisResponse["match"];
  job: AnalysisResponse["job"];
}

export default function MatchScoreCard({ match, job }: MatchScoreCardProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="score-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1A2980" />
                <stop offset="100%" stopColor="#26D0CE" />
              </linearGradient>
            </defs>
          </svg>

          <CircularProgress
            variant="determinate"
            value={100}
            size={90}
            thickness={5}
            sx={{ color: "#e9eff4", position: "absolute" }}
          />

          <CircularProgress
            variant="determinate"
            value={match.score}
            size={90}
            thickness={5}
            sx={{
              "svg circle": { stroke: "url(#score-gradient)" },
            }}
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
          <Typography variant="h6" sx={{ color: "#1A2980" }}>
            {job.jobTitle}
            {job.companyName && ` @ ${job.companyName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {match.explanation}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ mb: 1, color: "#1A2980" }}>
        Matched skills
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
        {match.matchedSkills.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            variant="outlined"
            sx={{
              color: "#1A2980",
              borderColor: "#1A2980",
              fontWeight: 500,
            }}
          />
        ))}
      </Stack>

      <Typography variant="subtitle2" sx={{ mb: 1, color: "#1A2980" }}>
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
            sx={{
              backgroundColor: "rgba(218, 102, 102, 0.05)",
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
}