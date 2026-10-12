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
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    const stored = getUserApiKeys();
    const appConfigured = isAppConfigured();

    const timer = setTimeout(() => {
      setIsMounted(true);
      setKeys(stored);
      setConfigured(appConfigured);
      if (stored.appPassword && !stored.geminiApiKey) {
        setActiveTab(1);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = getUserApiKeys();
      setKeys(stored);
      setConfigured(isAppConfigured());
      if (stored.appPassword && !stored.geminiApiKey) {
        setActiveTab(1);
      } else {
        setActiveTab(0);
      }
    }
    setOpen(true);
  }, []);

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
    configured: isMounted ? configured : false,
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
