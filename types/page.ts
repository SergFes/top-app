export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export type TTopPageAdvantage = {
    _id: string;
    title: string;
    description: string;
};

export type THhData = {
    _id: string;
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updatedAt: Date;
};

export type TTopPageModel = {
    tags: string[];
    _id: string;
    secondCategory: string;
    alias: string;
    title: string;
    category: string;
    seoText: string;
    tagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: TopLevelCategory;
    advantages: TTopPageAdvantage[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    hh: THhData;
    qas: any[];
};
