import { Pagination } from "./CommonEntity";

export interface Customer {
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
}

export interface CustomersRes {
    customers: Customer[],
    pagination: Pagination,
}