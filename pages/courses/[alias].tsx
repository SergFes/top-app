import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { withLayout } from "../../layout/layout";
import { TMenuItem } from "../../types/menu";
import { TTopPageModel } from "../../types/page";
import { TProductModel } from "../../types/product";

const firstCategory = 0;

type CourseProps = {
    firstCategory: number;
    menu: TMenuItem[];
    page: TTopPageModel;
    products: TProductModel[];
};
function Course({ firstCategory, menu, page, products }: CourseProps) {
    console.info(firstCategory, menu, page);
    return (
        <>
            <ul>{products && products.map((product) => <li key={product._id}>{product.title}</li>)}</ul>
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<TMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
        firstCategory,
    });

    return {
        paths: menu.flatMap((m) => m.pages.map((page) => "/courses/" + page.alias)),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }) => {
    if (!params) {
        return {
            notFound: true,
        };
    }

    const { data: menu } = await axios.post<TMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
        firstCategory,
    });

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
            firstCategory,
        },
    };
};
