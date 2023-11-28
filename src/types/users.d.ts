import { SortOrder } from "antd/es/table/interface";

export interface IFilterGetUser {
    page: number;
    limit: number;
    sort: SortOrder;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    gender: "male" | "female";
    age: string;
    phone: string
}
