import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import cn from "classnames";
import styles from "./menu.module.css";
import { AppContext } from "../../context/app.context";
import { TFirstLevelMenuItem, TPage } from "../../types/menu";
import { TopLevelCategory } from "../../types/page";
import { BooksIcon, CoursesIcon, ProductsIcon, ServicesIcon } from "../icons";

export const firstLevelMenu: TFirstLevelMenuItem[] = [
    { route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: "services", name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
    { route: "books", name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
    { route: "products", name: "Продукты", icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

export const Menu = () => {
    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory === secondCategory) {
                        m.isOpened = !m.isOpened;
                    }
                    return m;
                }),
            );
    };

    const buildFirstLavel = () => {
        return firstLevelMenu.map((menu) => (
            <div key={menu.route}>
                <Link href={`/${menu.route}`}>
                    <a>
                        <div
                            className={cn(styles.firstLevel, { [styles.firstLevelActive]: menu.id === firstCategory })}
                        >
                            {menu.icon}
                            <span>{menu.name}</span>
                        </div>
                    </a>
                </Link>
                {menu.id === firstCategory && buildSecondaryLevel(menu)}
            </div>
        ));
    };

    const buildSecondaryLevel = (menuItem: TFirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => {
                    if (m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>
                                {m._id.secondCategory}
                            </div>
                            <div className={cn(styles.secondLevelBlock, { [styles.secondLevelBlockOpen]: m.isOpened })}>
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: TPage[], route: string) => {
        return pages.map((p) => (
            <Link href={`/${route}/${p.alias}`} key={p._id}>
                <a
                    className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
                    })}
                >
                    {p.category}
                </a>
            </Link>
        ));
    };

    return <div className={styles.menu}>{buildFirstLavel()}</div>;
};
