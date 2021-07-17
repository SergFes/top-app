import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import { format } from "date-fns";
import styles from "./footer.module.css";
import { Paragraph } from "../../components";

type TProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Footer = ({ className, ...props }: TProps) => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <Paragraph className={styles.paragraph}>
                OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены
            </Paragraph>
            <a href="#" target={"_blank"} className={styles.link}>
                <Paragraph>Пользовательское соглашение</Paragraph>
            </a>
            <a href="#" target={"_blank"} className={styles.link}>
                <Paragraph>Политика конфиденциальности</Paragraph>
            </a>
        </footer>
    );
};
