import { GetStaticProps } from "next";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { Button, Heading, Paragraph, Rating, Tag } from "../components";
import { withLayout } from "../layout/layout";
import { TMenuItem } from "../types/menu";

type HomeProps = {
    menu: TMenuItem[];
    firstCategory: number;
};
function Home({ menu, firstCategory }: HomeProps) {
    console.info(firstCategory, menu);
    const [rating, setRating] = useState(4);
    const handleSetRating = useCallback(
        (rating: number) => {
            setRating(() => rating);
        },
        [setRating],
    );
    return (
        <>
            <Heading tag={"h3"}>Заголовок h3</Heading>
            <Heading tag={"h2"}>Заголовок h2</Heading>
            <Heading tag={"h1"}>Заголовок h1</Heading>
            <Button arrow={"right"}>Button</Button>
            <Button appearance={"ghost"} arrow={"down"}>
                Button
            </Button>
            <Paragraph size={"s"}>Маленький</Paragraph>
            <Paragraph size={"m"}>Средний</Paragraph>
            <Paragraph size={"l"}>Большой</Paragraph>
            <Tag>Ghost</Tag>
            <Tag size={"m"} color={"red"}>
                Red
            </Tag>
            <Tag size={"m"} color={"grey"}>
                Grey
            </Tag>
            <Tag size={"m"} color={"green"}>
                Green
            </Tag>
            <Tag size={"m"} color={"primary"}>
                Primary
            </Tag>
            <Rating rating={rating} isEditable setRating={handleSetRating} />
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<TMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
        firstCategory,
    });

    return {
        props: {
            menu,
            firstCategory,
        },
    };
};
