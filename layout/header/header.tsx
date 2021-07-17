import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type TProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Header = (props: TProps) => {
    return <div {...props}>Header</div>;
};
