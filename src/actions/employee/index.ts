"use server";
import { IFilterGet } from "@/types";
import { SortOrder } from "antd/es/table/interface";
import { revalidateTag } from "next/cache";

export const handleGetEmployeeAction = async (props: IFilterGet) => {
  const { page = 1, limit = 5, sort = "ascend" } = props;

  const res = await fetch(
    `http://localhost:8000/employees?_page=${page}&_limit=${limit}&_sort=${sort}`,
    {
      method: "GET",
      next: { tags: ["list-employees"] }
    }
  );
  return await res;
};

export const handleCreateEmployeeAction = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/employees`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  revalidateTag("list-employees");
  return await res.json();
};

export const handleUpdateEmployeeAction = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/employees/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  revalidateTag("list-employees");
  return await res.json();
};

export const handleDeleteEmployeeAction = async (data: any) => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/employees/${data.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  revalidateTag("list-employees");
  return await res.json();
};

export const handleDeleteEmployeesAction = async (data: any) => {
  console.log(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/employees/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data
  });
  revalidateTag("list-employees");
  return await res.json();
};
