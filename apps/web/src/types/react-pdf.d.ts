
declare module "@react-pdf/renderer" {
  import React from "react";

  export const pdf: (element: React.ReactElement) => {
    toBlob: () => Promise<Blob>;
    toStream: () => Promise<NodeJS.ReadableStream>;
  };

  export interface CommonProps {
    children?: React.ReactNode;
    style?: unknown;
    id?: string;
    debug?: boolean;
    render?: (props: {
      pageNumber: number;
      totalPages: number;
    }) => React.ReactNode;
  }

  export const Document: React.FC<
    CommonProps & { title?: string; author?: string }
  >;
  export const Page: React.FC<
    CommonProps & {
      size?: string | { width: number; height: number };
      orientation?: "portrait" | "landscape";
    }
  >;
  export const Text: React.FC<CommonProps & { wrap?: boolean }>;
  export const View: React.FC<CommonProps & { wrap?: boolean }>;

  export const Image: React.FC<
    CommonProps & {
      src?:
        | string
        | {
            uri: string;
            method?: string;
            headers?: Record<string, string>;
            body?: string;
          }
        | Blob;
      cache?: boolean;
      alt?: string;
    }
  >;

  export const StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => T;
  };

  export const Font: {
    register: (options: Record<string, unknown>) => void;
    registerHyphenationCallback: (callback: (word: string) => string[]) => void;
  };
}