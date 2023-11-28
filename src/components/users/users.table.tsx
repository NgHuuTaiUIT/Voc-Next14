'use client'

import type { ColumnsType } from 'antd/es/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import CreateUser from './create.user';
import UpdateUser from './update.user';
import { handleDeleteUserAction } from '@/actions/users';
import { Popconfirm, Table, message, Button } from 'antd';
import { IMeta, IUser } from '@/types';
interface IProps {
    users: IUser[] | [];
    meta: IMeta;
}

const UsersTable = (props: IProps) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { users, meta } = props;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    useEffect(() => {
        if (users) setIsFetching(false)
    }, [users])

    const columns: ColumnsType<IUser> = [
        {
            title: 'Id',
            dataIndex: 'id',
            
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            // defaultSortOrder: 'ascend',
            // sorter: (a, b) => +a.name - +b.name,
        },{
            title: 'gender',
            dataIndex: 'gender',
        },{
            title: 'age',
            dataIndex: 'age',
        },{
            title: 'phone',
            dataIndex: 'phone',
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
                dataSource={users}
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

            <CreateUser
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUser
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

        </div>
    )
}

export default UsersTable;