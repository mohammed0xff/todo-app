export type PaginatedResponse<T> = {
    data: T[],
    pageNumber: number,
    pageSize: number, 
    totalRecords: number, 
}