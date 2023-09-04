import React, {useContext } from "react";
import { Button, Form, Input, Radio, InputNumber } from 'antd';

import "./AddForm.css";

import { UserContext } from "../../context/user-context/user-context.jsx";

const AddForm = () => {
    const userContext = useContext(UserContext);

    const onFinish = (values) => {
        console.log('Success:', values);
        userContext.addUser(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="form">
            <Form    
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                scrollToFirstError={true}
            >    
                <Form.Item
                    label="نام"
                    name="name"
                    rules={[
                        {
                        required: true,
                        message: 'لطفا نام خود را وارد کنید',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="نام خانوادگی"
                    name="surname"
                    rules={[
                        {
                        required: true,
                        message: 'لطفا نام خانوادگی خود را وارد کنید',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="کد ملی"
                    name="code"
                    rules={[
                        {
                        required: true,
                        message: 'لطفا کد ملی خود را وارد کنید',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="شماره موبایل"
                    name="phone"
                    rules={[
                        {
                        required: true,
                        message: 'لطفا شماره موبایل خود را وارد کنید',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{display: 'flex', justifyContent: 'start', marginRight: '19%'}} 
                    label="سن"
                    name="age"
                    rules={[
                        {
                        required: true,
                        message: 'لطفا سن خود را وارد کنید',
                        },
                    ]}
                >
                    <InputNumber min={1} max={90} />
                </Form.Item>

                <Form.Item
                    style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'start',
                        textAlign: 'center',
                        marginRight: '13%',
                    }}
                    label="جنسیت"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'لطفا جنسبت خود را انتخاب کنید'
                        }
                    ]}
                >
                    <Radio.Group buttonStyle="solid" style={{flexDirection: 'row-reverse'}}>
                        <Radio.Button value="مرد" style={{width: '4rem'}}> مرد </Radio.Button>
                        <Radio.Button value="زن" style={{width: '4rem'}}> زن </Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button style={{width: '100%'}} type="primary" htmlType="submit">
                        افزودن
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default AddForm;
