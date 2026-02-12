import styles from "./Button.module.css";

export default function Button({
    children,
    variant = "primary",
    fullWidth = false,
    size = "medium",
    className = "",
    ...props
}) {
    const classes = [
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : "",
        size === "small" ? styles.small : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
