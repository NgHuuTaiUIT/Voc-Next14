import { handleGetUsersAction } from "@/actions/users";
import UsersTable from "@/components/users/users.table";
import { SortOrder } from "antd/es/table/interface";

const UsersPage = async (props: any) => {
    const LIMIT = 5;
    const page = props?.searchParams?.page ?? 1;
    const sort : SortOrder = props?.searchParams?.sort ?? 'descend';
    console.log(props);

    const res = await handleGetUsersAction({
        page: page,
        limit: LIMIT,
        sort: sort
    })
    
    const total_items = +(res.headers?.get("X-Total-Count") ?? 0)
    const data = await res.json();

    return (
        <div>
            <UsersTable
                users={data ? data : []}
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

export default UsersPage;