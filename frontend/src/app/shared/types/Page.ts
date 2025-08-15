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
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0
    }
}

export default Page;
