import * as React from "react";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Frappe React UI Logo"
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}
