import React, { useContext } from "react";
import cn from "classnames";
import BooksIcon from "./assets/books.svg";
import CoursesIcon from "./assets/courses.svg";
import ProductsIcon from "./assets/products.svg";
import ServicesIcon from "./assets/services.svg";
import styles from "./menu.module.css";
import { AppContext } from "../../context/app.context";
import { TFirstLevelMenuItem, TPage } from "../../types/menu";
import { TopLevelCategory } from "../../types/page";

const firstLevelMenu: TFirstLevelMenuItem[] = [
    { route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: "services", name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
    { route: "books", name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
    { route: "products", name: "Продукты", icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

export const Menu = () => {
    const { menu, firstCategory } = useContext(AppContext);

    const buildFirstLavel = () => {
        return firstLevelMenu.map((menu) => (
            <div key={menu.route}>
                <a href={`/${menu.route}`}>
                    <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: menu.id === firstCategory })}>
                        {menu.icon}
                        <span>{menu.name}</span>
                    </div>
                </a>
                {buildSecondaryLevel(menu)}
            </div>
        ));
    };

    const buildSecondaryLevel = (menuItem: TFirstLevelMenuItem) => {
        return (
            <div>
                {menu.map((m) => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>{m._id.secondCategory}</div>
                        <div className={cn(styles.secondLevelBlock, { [styles.secondLevelBlockOpen]: m.isOpened })}>
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const buildThirdLevel = (pages: TPage[], route: string) => {
        return pages.map((p) => (
            <a href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, { [styles.thirdLevelActive]: false })}>
                {p.category}
            </a>
        ));
    };

    return <div className={styles.menu}>{buildFirstLavel()}</div>;
};
