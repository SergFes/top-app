import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { Menu } from "../menu/menu";

type TProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Sidebar = (props: TProps) => {
    return (
        <div {...props}>
            <Menu />
        </div>
    );
};
