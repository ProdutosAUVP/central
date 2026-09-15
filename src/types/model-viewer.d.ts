import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  ar?: boolean;
  "auto-rotate"?: boolean;
  "camera-controls"?: boolean;
  "disable-zoom"?: boolean;
  "shadow-intensity"?: string | number;
  exposure?: string | number;
  "environment-image"?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

export {};
