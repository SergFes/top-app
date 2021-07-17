import React, { ButtonHTMLAttributes, DetailedHTMLProps, memo, ReactNode } from "react";
import cn from "classnames";
import ArrowIcon from "./assets/arrow.svg";
import styles from "./button.module.css";

type TProps = {
    children: ReactNode;
    appearance?: "primary" | "ghost";
    arrow?: "none" | "right" | "down";
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = memo(({ appearance = "primary", children, className, arrow = "none", ...props }: TProps) => {
    const ArrowJSX = arrow !== "none" && (
        <span className={cn(styles.arrow, { [styles.down]: arrow === "down" })}>
            <ArrowIcon />
        </span>
    );
    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: appearance === "primary",
                [styles.ghost]: appearance === "ghost",
            })}
            {...props}
        >
            {children}
            {ArrowJSX}
        </button>
    );
});
