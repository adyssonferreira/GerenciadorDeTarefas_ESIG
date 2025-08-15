type Page<T> = {
    items: T[];
    size: number,
    number: number,
    totalElements: number,
    totalPages: number
};

export type PageParams = {
    size: number,
    page: number
}

export function getInitialPage<T>(): Page<T> {
    return {
        items: [],
        size: 10,
        number: 0,
        totalElements: 0,
        totalPages: 0
    }
}

export default Page;
