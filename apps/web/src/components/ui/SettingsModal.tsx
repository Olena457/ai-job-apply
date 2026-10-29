"use client";

import { Dialog, DialogContent, Box, Tabs, Tab, Alert } from "@mui/material";
import { KeyRound, ShieldCheck, CheckCircle2 } from "lucide-react";
import { COLORS, SHADOWS } from "@/constants/theme";
import { useSettingsModal } from "@/hooks/useSettingsModal";
import SettingsTrigger from "./SettingsTrigger";
import SettingsHeader from "./SettingsHeader";
import SettingsFooter from "./SettingsFooter";
import ByokTab from "./ByokTab";
import AdminTab from "./AdminTab";

export default function SettingsModal() {
  const {
    open,
    handleOpen,
    handleClose,
    activeTab,
    setActiveTab,
    configured,
    keys,
    updateKey,
    showGemini,
    setShowGemini,
    showTavily,
    setShowTavily,
    showOpenRouter,
    setShowOpenRouter,
    showPassword,
    setShowPassword,
    saveSuccess,
    handleSave,
    handleClear,
  } = useSettingsModal();

  return (
    <>
      <SettingsTrigger onClick={handleOpen} configured={configured} />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: SHADOWS.card,
              overflow: "hidden",
            },
          },
        }}
      >
        <SettingsHeader onClose={handleClose} />

        <Box sx={{ px: 3, borderBottom: `1px solid ${COLORS.border}` }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: COLORS.cyan,
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: COLORS.textMuted,
                flex: 1, 
                "&.Mui-selected": {
                  color: COLORS.navy,
                },
              },
            }}
          >
            <Tab
              icon={<KeyRound size={18} />}
              iconPosition="start"
              label="Your API Keys"
            />
            <Tab
              icon={<ShieldCheck size={18} />}
              iconPosition="start"
              label="Administrator"
            />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 3, pt: 2.5 }}>
          {saveSuccess && (
            <Alert
              icon={<CheckCircle2 size={20} />}
              severity="success"
              sx={{ mb: 2, borderRadius: 2 }}
            >
              Settings saved successfully!
            </Alert>
          )}

          {activeTab === 0 && (
            <ByokTab
              keys={keys}
              updateKey={updateKey}
              showGemini={showGemini}
              setShowGemini={setShowGemini}
              showTavily={showTavily}
              setShowTavily={setShowTavily}
              showOpenRouter={showOpenRouter}
              setShowOpenRouter={setShowOpenRouter}
            />
          )}

          {activeTab === 1 && (
            <AdminTab
              keys={keys}
              updateKey={updateKey}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
        </DialogContent>

        <SettingsFooter
          onClear={handleClear}
          onClose={handleClose}
          onSave={handleSave}
        />
      </Dialog>
    </>
  );
}
