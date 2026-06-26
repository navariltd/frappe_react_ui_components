import * as React from "react";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return (
    <img
      src="/assets/frappe_react_ui_components/react-ui-180.png"
      alt="Frappe React UI Logo"
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}
