"use server";
import { IFilterGet } from "@/types";
import { SortOrder } from "antd/es/table/interface";
import { revalidateTag } from "next/cache";

export const handleGetAppointmentAction = async (props: IFilterGet) => {
  const { page = 1, limit = 5, sort = "ascend" } = props;

  const res = await fetch(
    `http://localhost:8000/appointments?_page=${page}&_limit=${limit}&_sort=${sort}`,
    {
      method: "GET",
      next: { tags: ["list-appointments"] }
    }
  );
  return await res;
};

export const handleCreateAppointmentAction = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/appointments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  revalidateTag("list-appointments");
  return await res.json();
};

export const handleUpdateAppointmentAction = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/appointments/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  revalidateTag("list-appointments");
  return await res.json();
};

export const handleDeleteAppointmentAction = async (data: any) => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/appointments/${data.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
  revalidateTag("list-appointments");
  return await res.json();
};

export const handleDeleteAppointmentsAction = async (data: any) => {
  console.log(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/appointments/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data
  });
  revalidateTag("list-appointments");
  return await res.json();
};
