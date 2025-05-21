import type React from "react"
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src: string
        alt: string
        "auto-rotate"?: boolean
        "camera-controls"?: boolean
        "shadow-intensity"?: string
        "environment-image"?: string
        exposure?: string
        ar?: boolean
        "ar-modes"?: string
        style?: React.CSSProperties
      },
      HTMLElement
    >
  }
}
