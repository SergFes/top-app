import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { firstLevelMenu } from "../../components/menu/menu";
import { withLayout } from "../../layout/layout";
import { TMenuItem } from "../../types/menu";
import { TopLevelCategory, TTopPageModel } from "../../types/page";
import { TProductModel } from "../../types/product";

type CourseProps = {
    firstCategory: TopLevelCategory;
    menu: TMenuItem[];
    page: TTopPageModel;
    products: TProductModel[];
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Course({ firstCategory, menu, page, products }: CourseProps) {
    return (
        <>
            <ul>{products && products.map((product) => <li key={product._id}>{product.title}</li>)}</ul>
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: string[] = [];
    for (const menuItem of firstLevelMenu) {
        const { data: menu } = await axios.post<TMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
            firstCategory: menuItem.id,
        });
        paths.push(...menu.flatMap((m) => m.pages.map((page) => `/${menuItem.route}/${page.alias}`)));
    }

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }) => {
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

        const { data: page } = await axios.get<TTopPageModel>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias,
        );

        const { data: products } = await axios.post<TProductModel[]>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find/",
            {
                category: page.category,
                limit: 10,
            },
        );

        return {
            props: {
                menu,
                page,
                products,
                firstCategory: firstCategoryItem.id,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};
