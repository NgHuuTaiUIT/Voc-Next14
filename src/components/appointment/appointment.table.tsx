'use client'

import { Table, Popconfirm, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import CreateAppointment from './create.appointment';
import UpdateAppointment from './update.appointment';
import { handleDeleteUserAction } from '@/actions/users';
import { IAppointment, IEmployee, IMeta, IUser } from '@/types';
import moment from 'moment';
import "moment-timezone";

interface IProps {
    appointments: IAppointment[] | [];
    users: IUser[];
    employees: IEmployee[]
    meta: IMeta
}

const UsersTable = (props: IProps) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { appointments, meta, users, employees } = props;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    useEffect(() => {
        if (appointments) setIsFetching(false)
    }, [appointments])

    const columns: ColumnsType<IAppointment> = [
        {
            title: 'Id',
            dataIndex: 'id',
            
        },
        {
            title: 'Customer',
            dataIndex: 'user',
            render: (text, record, index) => {
                return <>{record?.user?.name}</>
            }
        },
        {
            title: 'Employee',
            dataIndex: 'employee',
            render: (text, record, index) => {
                return <>{record?.employee?.name}</>
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record, index) => {
                const date =  moment(record?.date).tz(moment.tz.guess()).format("DD-MM-YYYY HH:mm:ss");
                return <>{date}</>
            }
        },
        {
            title: 'Actions',
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataUpdate(record);
                            }}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(record)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </>
                )
            }
        }

    ];

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Thêm mới
                </Button>
            </div>
        )
    }

    const handleDeleteUser = async (user: any) => {
        await handleDeleteUserAction({ id: user.id })
        message.success("Delete user succeed")
    };

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set('page', pagination.current);
            replace(`${pathname}?${params.toString()}`);
            setIsFetching(true)
        }
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div>
            <Table
                title={renderHeader}
                loading={isFetching}
                rowKey={"id"}
                bordered
                dataSource={appointments}
                columns={columns}
                onChange={onChange}
                rowSelection={rowSelection}
                pagination={
                    {
                        ...meta,
                        showTotal: (total, range) => {
                            return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                        }
                    }
                }
            />

            <CreateAppointment
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                appointments={appointments}
                users={users}
                employees={employees}
            />

            <UpdateAppointment
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                appointments={appointments} 
                users={users}
                employees={employees}
            />

        </div>
    )
}

export default UsersTable;