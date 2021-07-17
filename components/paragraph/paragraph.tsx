import React, { DetailedHTMLProps, HTMLAttributes, memo, ReactNode } from "react";
import cn from "classnames";
import styles from "./paragraph.module.css";

type TProps = {
    children: ReactNode;
    size?: "s" | "m" | "l";
} & DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

export const Paragraph = memo(({ className, children, size = "m", ...props }: TProps) => {
    return (
        <p
            className={cn(styles.p, className, {
                [styles.s]: size === "s",
                [styles.m]: size === "m",
                [styles.l]: size === "l",
            })}
            {...props}
        >
            {children}
        </p>
    );
});
