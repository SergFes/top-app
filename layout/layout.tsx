import React, { FunctionComponent, ReactNode } from "react";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import styles from "./layout.module.css";
import { Sidebar } from "./sidebar/sidebar";
import { AppContextProvider, TAppContext } from "../context/app.context";

type TProps = {
    children: ReactNode;
};
const Layout = ({ children }: TProps) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <div className={styles.body}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & TAppContext>(Component: FunctionComponent<T>) => {
    return (props: T) => (
        <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
            <Layout>
                <Component {...props} />
            </Layout>
        </AppContextProvider>
    );
};
