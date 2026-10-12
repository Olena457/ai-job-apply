"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getUserApiKeys,
  saveUserApiKeys,
  isAppConfigured,
  UserApiKeys,
} from "@/lib/keysStorage";

export function useSettingsModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [configured, setConfigured] = useState(false);

  const [keys, setKeys] = useState<UserApiKeys>({
    geminiApiKey: "",
    tavilyApiKey: "",
    openRouterApiKey: "",
    googleScriptUrl: "",
    appPassword: "",
  });

  const [showGemini, setShowGemini] = useState(false);
  const [showTavily, setShowTavily] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync keys and configured state from localStorage
  const syncState = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = getUserApiKeys();
    setKeys(stored);
    setConfigured(isAppConfigured());
    if (stored.appPassword && !stored.geminiApiKey) {
      setActiveTab(1);
    }
  }, []);

  // Run on mount
  useEffect(() => {
    syncState();
  }, [syncState]);

  // Run when dialog opens
  useEffect(() => {
    if (open) {
      syncState();
    }
  }, [open, syncState]);

  const handleOpen = useCallback(() => {
    syncState();
    setOpen(true);
  }, [syncState]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const updateKey = useCallback((field: keyof UserApiKeys, value: string) => {
    setKeys((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    saveUserApiKeys(keys);
    setConfigured(isAppConfigured());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setOpen(false);
    }, 600);
  }, [keys]);

  const handleClear = useCallback(() => {
    const emptyKeys: UserApiKeys = {
      geminiApiKey: "",
      tavilyApiKey: "",
      openRouterApiKey: "",
      googleScriptUrl: "",
      appPassword: "",
    };
    setKeys(emptyKeys);
    saveUserApiKeys(emptyKeys);
    setConfigured(false);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
    activeTab,
    setActiveTab,
    configured,
    keys,
    setKeys,
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
  };
}
