import React, { DetailedHTMLProps, HTMLAttributes, memo, ReactNode } from "react";
import cn from "classnames";
import styles from "./tag.module.css";

type TProps = {
    children: ReactNode;
    size?: "s" | "m";
    color?: "ghost" | "red" | "grey" | "green" | "primary";
    href?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Tag = memo(({ children, href, size = "s", color = "ghost", ...props }: TProps) => {
    const linkJSX = href && <a href={href}>{children}</a>;
    return (
        <p
            className={cn(styles.tag, {
                [styles.s]: size === "s",
                [styles.m]: size === "m",
                [styles.ghost]: color === "ghost",
                [styles.red]: color === "red",
                [styles.grey]: color === "grey",
                [styles.green]: color === "green",
                [styles.primary]: color === "primary",
            })}
            {...props}
        >
            {linkJSX || children}
        </p>
    );
});
