"use client";

import { Container, Box } from "@mui/material";
import ApplicationForm from "@/components/form/ApplicationForm";
import PageHeader from "@/components/sections/PageHeader";
import FeaturesSidebar from "@/components/sections/FeaturesSidebar";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <PageHeader />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "360px 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          <Box sx={{ position: { md: "sticky" }, top: 32 }}>
            <FeaturesSidebar />
          </Box>

          <Box>
            <ApplicationForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
