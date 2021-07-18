import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import axios from "axios";
import { firstLevelMenu } from "../../components/menu/menu";
import { withLayout } from "../../layout/layout";
import { TMenuItem } from "../../types/menu";
import { TopLevelCategory } from "../../types/page";

type TypeProps = {
    firstCategory: TopLevelCategory;
    menu: TMenuItem[];
};
function Type({ firstCategory }: TypeProps) {
    return <>Type {firstCategory}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map((m) => "/" + m.route),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.typeCategory);

    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }

    try {
        const { data: menu } = await axios.post<TMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
            firstCategory: firstCategoryItem.id,
        });

        if (!menu.length) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};
