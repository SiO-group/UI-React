export type PageItem =
    | { type: 'page'; page: number }
    | { type: 'ellipsis'; key: string };