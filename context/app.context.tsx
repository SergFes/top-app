import React, { createContext, PropsWithChildren, useState } from "react";
import { TMenuItem } from "../types/menu";
import { TopLevelCategory } from "../types/page";

export type TAppContext = {
    menu: TMenuItem[];
    firstCategory: TopLevelCategory;
    setMenu?: (newMenu: TMenuItem[]) => void;
};

export const AppContext = createContext<TAppContext>({ menu: [], firstCategory: TopLevelCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<TAppContext>) => {
    const [menuState, setMenuState] = useState<TMenuItem[]>(menu);
    const setMenu = (newMenu: TMenuItem[]) => setMenuState(newMenu);

    return <AppContext.Provider value={{ menu: menuState, setMenu, firstCategory }}>{children}</AppContext.Provider>;
};
