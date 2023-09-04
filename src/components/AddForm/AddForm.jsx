import React from "react";
import { Button, Form, Input, Radio } from 'antd';

import "./AddForm.css";

const AddForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
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
                    style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'center',
                        textAlign: 'center',
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
                        <Radio.Button value="male" style={{width: '50%'}}> مرد </Radio.Button>
                        <Radio.Button value="female" style={{width: '50%'}}> زن </Radio.Button>
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
