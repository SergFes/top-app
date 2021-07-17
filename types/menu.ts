import { TopLevelCategory } from "./page";

export type TPage = {
    _id: string;
    alias: string;
    title: string;
    category: string;
};
export type TMenuItem = {
    _id: {
        secondCategory: string;
    };
    pages: TPage[];
    isOpened: boolean;
};

export type TFirstLevelMenuItem = {
    route: string;
    name: string;
    icon: JSX.Element;
    id: TopLevelCategory;
};
