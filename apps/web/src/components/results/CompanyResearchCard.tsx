
import { Chip, Paper, Stack, Typography, Box } from "@mui/material";
import { AlertTriangle, CheckCircle2, Globe, Users, Calendar, Briefcase } from "lucide-react";
import type { AnalysisResponse } from "../../types/analysis";
import { COLORS } from "@/constants/theme";

interface CompanyResearchCardProps {
  company: AnalysisResponse["company"];
}

export default function CompanyResearchCard({
  company,
}: CompanyResearchCardProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, bgcolor: COLORS.lightBg || "#fff" }}>
      <Typography variant="h6" sx={{ mb: 1.5, color: COLORS.navy || "#1A2980", fontWeight: 700 }}>
        Company Research
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        {company.summary}
      </Typography>

      {company.website && company.website !== "unknown" && (
        <Typography variant="body2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Globe size={16} color={COLORS.navy} />
          Website:{" "}
          <a
            href={
              company.website.startsWith("http")
                ? company.website
                : `https://${company.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: COLORS.navy, textDecoration: "underline" }}
          >
            {company.website}
          </a>
        </Typography>
      )}

      {company.industry && company.industry !== "unknown" && (
        <Typography variant="body2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Briefcase size={16} color={COLORS.navy} />
          Industry: <b>{company.industry}</b>
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 3, my: 2 }}>
        {company.yearsOnMarket && (
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar size={16} color={COLORS.navy} />
            Market age: <b>{company.yearsOnMarket}</b>
          </Typography>
        )}
        {company.employees && (
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Users size={16} color={COLORS.navy} />
            Employees: <b>{company.employees}</b>
          </Typography>
        )}
      </Box>

      {/* Values */}
      {company.values?.length > 0 && (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
          {company.values.map((v) => (
            <Chip key={v} label={v} size="small" variant="outlined" sx={{ borderColor: COLORS.navy, color: COLORS.navy }} />
          ))}
        </Stack>
      )}

      {company.competitors?.length > 0 && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Competitors: <b>{company.competitors.join(", ")}</b>
        </Typography>
      )}

      {company.reviewsSummary && (
        <Typography variant="body2" sx={{ mb: 2, fontStyle: "italic" }}>
          Reviews summary: {company.reviewsSummary}
        </Typography>
      )}

      {company.greenFlags && company.greenFlags.length > 0 && (
        <Box sx={{ mb: 2, p: 2, bgcolor: "rgba(46, 125, 50, 0.05)", borderRadius: 2, border: "1px solid rgba(46, 125, 50, 0.2)" }}>
          <Typography variant="subtitle2" sx={{ color: "#2e7d32", display: "flex", alignItems: "center", gap: 1, mb: 1, fontWeight: 600 }}>
            <CheckCircle2 size={16} /> Green Flags (Pros)
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {company.greenFlags.map((g) => (
              <li key={g}>
                <Typography variant="body2" sx={{ color: "text.primary" }}>{g}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {company.redFlags && company.redFlags.length > 0 && (
        <Box sx={{ mb: 2, p: 2, bgcolor: "rgba(211, 47, 47, 0.05)", borderRadius: 2, border: "1px solid rgba(211, 47, 47, 0.2)" }}>
          <Typography variant="subtitle2" sx={{ color: "#d32f2f", display: "flex", alignItems: "center", gap: 1, mb: 1, fontWeight: 600 }}>
            <AlertTriangle size={16} /> Potential Red Flags
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {company.redFlags.map((r) => (
              <li key={r}>
                <Typography variant="body2" sx={{ color: "text.primary" }}>{r}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        AI summary of public search results, may be inaccurate. Verify before deciding.
      </Typography>
      
      {company.sources?.map((src) => (
        <Typography
          key={src}
          variant="caption"
          sx={{ display: "block", wordBreak: "break-all", color: "text.disabled" }}
        >
          {src}
        </Typography>
      ))}
    </Paper>
  );
}