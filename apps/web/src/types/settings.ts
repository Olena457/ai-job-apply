import { UserApiKeys } from "@/lib/keysStorage";

export interface AdminTabProps {
  keys: UserApiKeys;
  updateKey: (field: keyof UserApiKeys, value: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
}

export interface ByokTabProps {
  keys: UserApiKeys;
  updateKey: (field: keyof UserApiKeys, value: string) => void;
  showGemini: boolean;
  setShowGemini: (val: boolean) => void;
  showTavily: boolean;
  setShowTavily: (val: boolean) => void;
  showOpenRouter: boolean;
  setShowOpenRouter: (val: boolean) => void;
}