
import { handleCreateAppointmentAction } from '@/actions/appointment';
import { IAppointment, IEmployee, IUser } from '@/types';
import {
    Modal, Input, Form, Row, Col, message, Select, Divider, Space, Button, DatePicker,
} from 'antd';
import React, { useState, useRef, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { DatePickerProps, InputRef } from 'antd';
import { handleCreateUserAction } from '@/actions/users';
import moment from 'moment';
import { RangePickerProps } from 'antd/es/date-picker';
interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
    appointments: IAppointment[];
    users: IUser[];
    employees: IEmployee[];
}

const CreateAppointment = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen, appointments, users = [], employees
    } = props;

    const [form] = Form.useForm();

    // const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        // setItems([...items, name]);
        const res = await handleCreateUserAction({
            name: name,
            email: "",
            gender: "male",
            phone: "",
            age: ""
        });

        setName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      };

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);

    }

    const onFinish = async (values: any) => {
        const res = await handleCreateAppointmentAction(values);
        if (res?.id) {
            handleCloseCreateModal();
            message.success("Create succeed!")
        }

    };

    const handleSearch = (e:any) => {
        setSearchText(e)
    }
    const userOptions =  useMemo(() => {
        if(searchText === '') {
            return users.map(i => ({ value: i.id, label: i.name }))
        }else {
            return users.filter(i => i.name.toLowerCase().includes(searchText.toLowerCase())).map(i => ({ value: i.id, label: i.name }))
        }
    },[users, searchText])

    const employeeOptions =  employees.map(i => ({ value: i.id, label: i.name }))
      
    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        form.setFieldValue('date', moment(value?.toString()).toDate().getTime())
    };
    return (
        <Modal
            title="Add new appointment"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={[15, 15]}>
                        <Form.Item
                            label="Customer"
                            name="userId"
                            rules={[{ required: true, message: 'Please choose employee!' }]}
                        >
                            <Select
                                showSearch
                                notFoundContent={null}
                                style={{ width: 300 }}
                                placeholder="custom dropdown render"
                                dropdownRender={(menu) => (
                                    <>
                                    {menu}
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Space style={{ padding: '0 8px 4px' }}>
                                        <Input
                                        placeholder="Please enter item"
                                        ref={inputRef}
                                        value={name}
                                        onChange={onNameChange}
                                        onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                        Add item
                                        </Button>
                                    </Space>
                                    </>
                                )}
                                onSearch={handleSearch}
                                options={userOptions}
                                value={form}
                                filterOption={false}
                                />
                                
                        </Form.Item>
                </Row>
                <Row gutter={[20, 15]}>
                        <Form.Item
                            label="Employee"
                            name="employeeId"
                            rules={[{ required: true, message: 'Please choose employee!' }]}
                        >
                            <Select
                                style={{ width: 120 }}
                                value={form}
                                options={employeeOptions}
                                />
                        </Form.Item>
                </Row>
                <Row gutter={[20, 15]}>
                        <Form.Item
                            label="Date"
                            name="date"
                            getValueProps={(i) => ({ value: moment(i) })}
                        >
                            <Space direction="vertical" size={12}>
                                <DatePicker showTime={{ format: 'HH:mm' }} onOk={onOk}/>
                            </Space>
                        </Form.Item>
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateAppointment;