import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./sidebar.module.css";
import { Logo } from "../../components/icons";
import { Menu } from "../../components/menu/menu";

type TProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Sidebar = (props: TProps) => {
    return (
        <div {...props}>
            <div className={styles.sidebar}>
                <Logo className={styles.logo} />
                <div>Search</div>
                <Menu />
            </div>
        </div>
    );
};
