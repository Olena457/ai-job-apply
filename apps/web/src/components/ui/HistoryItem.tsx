import { Box, Typography, Stack, Chip, IconButton } from "@mui/material";
import { ExternalLink } from "lucide-react";
import { COLORS } from "@/constants/theme";
import { ApplicationRecord } from "@/types/history";

interface HistoryItemProps {
  item: ApplicationRecord;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1px solid ${COLORS.border}`,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ minWidth: 0, pr: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
          {item.companyName}
        </Typography>
        {item.jobTitle && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {item.jobTitle}
          </Typography>
        )}
        {item.date && (
          <Typography variant="caption" color="text.disabled">
            {item.date}
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Chip
          label={`${item.matchScore}%`}
          size="small"
          color={item.matchScore >= 70 ? "success" : "default"}
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
        {item.jobUrl && item.jobUrl.startsWith("http") && (
          <IconButton
            size="small"
            component="a"
            href={item.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
