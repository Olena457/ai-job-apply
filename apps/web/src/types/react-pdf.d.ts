declare module "@react-pdf/renderer" {
  export const pdf: (element: React.ReactElement) => {
    toBlob: () => Promise<Blob>;
  };
  export const Document: React.FC<{
    children?: React.ReactNode;
    title?: string;
  }>;
  export const Page: React.FC<{
    children?: React.ReactNode;
    size?: string;
    style?: unknown;
  }>;
  export const Text: React.FC<{ children?: React.ReactNode; style?: unknown }>;
  export const View: React.FC<{
    children?: React.ReactNode;
    style?: unknown;
    wrap?: boolean;
  }>;

  export const StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => T;
  };

  export const Font: {
    register: (options: Record<string, unknown>) => void;
    registerHyphenationCallback: (callback: (word: string) => string[]) => void;
  };
}
