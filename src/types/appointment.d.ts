import { IEmployee } from "./employee";
import { IUser } from "./users";

export interface IAppointment {
    id: number;
    user: IUser,
    employee: IEmployee,
    date: number,
}
