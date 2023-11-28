"use server";
import { SortOrder } from "antd/es/table/interface";
import { revalidateTag } from "next/cache";
import { IFilterGetUser } from "../../types/users";

export const handleGetUsersAction = async (props: IFilterGetUser) => {
  const { page = 1, limit = 5, sort = "ascend" } = props;

  const res = await fetch(
    `http://localhost:8000/users?_page=${page}&_limit=${limit}&_sort=${sort}`,
    {
      method: "GET",
      next: { tags: ["list-users"] }
    }
  );
  return await res;
};

export const handleGetUserAction = async (id: number) => {
  console.log(id);
  const res = await fetch(
    `http://localhost:8000/users/${id}`,
    {
      method: "GET",
      next: { tags: ["list-users"] }
    }
  );
  return await res;
};

export const handleCreateUserAction = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  revalidateTag("list-users");
  return await res.json();
};

export const handleUpdateUserAction = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  revalidateTag("list-users");
  return await res.json();
};

export const handleDeleteUserAction = async (data: any) => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${data.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  revalidateTag("list-users");
  return await res.json();
};

export const handleDeleteUsersAction = async (data: any) => {
  console.log(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data
  });
  revalidateTag("list-users");
  return await res.json();
};
