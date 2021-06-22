import { ButtonHTMLAttributes } from "react";
import "../styles/button.scss";

type ButtomProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtomProps) {
  return <button className="button" type="button" {...props} />;
}
