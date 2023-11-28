import { handleGetAppointmentAction } from "@/actions/appointment";
import { handleGetEmployeeAction } from "@/actions/employee";
import { handleGetUserAction, handleGetUsersAction } from "@/actions/users";
import AppointmentTable from "@/components/appointment/appointment.table";
import { IAppointment } from "@/types";
import { SortOrder } from "antd/es/table/interface";

const AppointmentsPage = async (props: any) => {
    const LIMIT = 99;
    const page = props?.searchParams?.page ?? 1;
    const sort : SortOrder = props?.searchParams?.sort ?? 'descend';


    const resAppointment = await handleGetAppointmentAction({
        page: page,
        limit: LIMIT,
        sort: sort
    })
    const resUsers = await handleGetUsersAction({
        page: page,
        limit: LIMIT,
        sort: sort
    })
    const resEmployees = await handleGetEmployeeAction({
        page: page,
        limit: LIMIT,
        sort: sort
    })
    const total_items = +(resAppointment.headers?.get("X-Total-Count") ?? 0)
    const data = await resAppointment.json();
    const dataUser = await resUsers.json();
    const dataEmployee = await resEmployees.json();

    
    const dataAppointment: IAppointment[] =data.map((i:any) =>  ({
        id: i.id,
        date: i.date,
        employee: dataEmployee.find((e:any) => e.id === i.employeeId),
        user: dataUser.find((u:any) => u.id === i.userId)
    }))   
    return (
        <div>
            <AppointmentTable
                appointments={dataAppointment ? dataAppointment : []}
                employees={dataEmployee ? dataEmployee : []}
                users={dataUser ? dataUser : []}
                meta={
                    {
                        current: +page,
                        pageSize: LIMIT,
                        total: total_items
                    }
                }
            />

        </div>
    )
}

export default AppointmentsPage;