
import { handleUpdateAppointmentAction } from '@/actions/appointment';
import { IAppointment, IEmployee, IUser } from '@/types';
import {
    Modal, Input,
    Form, Row, Col, message
} from 'antd';
import { useEffect } from 'react';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: any;
    appointments: IAppointment[];
    users: IUser[];
    employees: IEmployee[];
}

const UpdateAppointment = (props: IProps) => {

    const {
        isUpdateModalOpen, setIsUpdateModalOpen,
        dataUpdate, setDataUpdate
    } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            //code
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
            })
        }
    }, [dataUpdate, form])

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null)
    }

    const onFinish = async (values: any) => {
        const { name, email } = values;
        if (dataUpdate) {
            const data = {
                id: dataUpdate.id, //undefined
                name, email
            }

            await handleUpdateAppointmentAction(data)
            handleCloseUpdateModal();
            message.success("Update appointment succeed")
        }
    };

    return (
        <Modal
            title="Update a appointment"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseUpdateModal()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={[15, 15]}>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Name"
                            name="employee"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default UpdateAppointment;