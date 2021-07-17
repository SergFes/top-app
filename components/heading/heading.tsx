import React, { memo, ReactNode } from "react";
import styles from "./heading.module.css";

type TProps = {
    tag: "h1" | "h2" | "h3";
    children: ReactNode;
};
export const Heading = memo(({ tag, children }: TProps) => {
    return (
        {
            h1: <h1 className={styles.h1}>{children}</h1>,
            h2: <h2 className={styles.h2}>{children}</h2>,
            h3: <h3 className={styles.h3}>{children}</h3>,
        }[tag] || <>{children}</>
    );
});
