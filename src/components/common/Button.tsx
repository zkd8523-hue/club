import { ButtonProps } from '@/types/button';
import styles from "./Button.module.css";

export default function Button({
    children,
    variant = "primary",
    fullWidth = false,
    size = "medium",
    className = "",
    ...props
}: ButtonProps) {
    const buttonStyles = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className
    ].join(" ");

    return (
        <button className={buttonStyles} {...props}>
            {children}
        </button>
    );
}
