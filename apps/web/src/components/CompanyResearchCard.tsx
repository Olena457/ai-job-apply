import { Chip, Paper, Stack, Typography } from "@mui/material";
import type { AnalysisResponse } from "../types/analysis";

interface CompanyResearchCardProps {
  company: AnalysisResponse["company"];
}

export default function CompanyResearchCard({
  company,
}: CompanyResearchCardProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Company research
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {company.summary}
      </Typography>
      <Typography variant="body2">
        Years on market: <b>{company.yearsOnMarket}</b>
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Employees: <b>{company.employees}</b>
      </Typography>

      {company.values.length > 0 && (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
          {company.values.map((v) => (
            <Chip key={v} label={v} size="small" />
          ))}
        </Stack>
      )}

      <Typography variant="body2" sx={{ mb: 1 }}>
        Reviews: {company.reviewsSummary}
      </Typography>

      {company.redFlags.length > 0 && (
        <>
          <Typography variant="subtitle2" color="error">
            Possible red flags
          </Typography>
          <ul style={{ marginTop: 4 }}>
            {company.redFlags.map((r) => (
              <li key={r}>
                <Typography variant="body2">{r}</Typography>
              </li>
            ))}
          </ul>
        </>
      )}

      <Typography variant="caption" color="text.secondary">
        AI summary of public search results, may be inaccurate. Verify before
        deciding.
      </Typography>
      {company.sources.map((src) => (
        <Typography
          key={src}
          variant="caption"
          sx={{ display: "block", wordBreak: "break-all" }}
        >
          {src}
        </Typography>
      ))}
    </Paper>
  );
}
