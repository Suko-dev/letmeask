import { ButtonHTMLAttributes } from "react";
import "../styles/button.scss";

type ButtomProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line react/require-default-props
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtomProps) {
  return (
    <button
      className={`button ${isOutlined ? "outlined" : ""}`}
      type="button"
      {...props}
    />
  );
}
