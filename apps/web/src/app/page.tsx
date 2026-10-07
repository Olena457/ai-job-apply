
"use client";

import { Container, Box, Stack } from "@mui/material";
import ApplicationForm from "@/components/form/ApplicationForm";
import PageHeader from "@/components/sections/PageHeader";
import FeaturesSidebar from "@/components/sections/FeaturesSidebar";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh",  pt:0, pb: { xs: 3, } }}>
      <Container maxWidth="md">
        <Stack >
          <PageHeader />
        </Stack>
        <FeaturesSidebar />

        <ApplicationForm />
      </Container>
    </Box>
  );
}