import React from "react";
import { Button, Form, Input, Radio, InputNumber, message } from 'antd';
import axios from "axios";

import "./AddForm.css";

// import { UserContext } from "../../context/user-context/user-context.jsx";

const AddForm = () => {
    // const userContext = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();
    const key = "addUser";  

    const onFinish = (values) => {
        messageApi.open({key, type: 'loading', content: 'در حال ثبت کاربر...', duration: 1000});
        values = {
            id: Math.floor(Math.random() * 1000),
            ...values,
        };
        axios.post('http://localhost:8000/users', values)
        .then((response) => {
            setTimeout(()=>{messageApi.open({key, type: 'success', content: 'کاربر با موفقیت ثبت شد', duration: 2});},500);
        })
        .catch((err) => {
            setTimeout(()=>{messageApi.open({key, type: 'error', content: 'خطا رخ داد', duration: 2});},500);
        });
        
        // userContext.addUser(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="form">
            {contextHolder}
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
                        {
                            whitespace: true,
                            message: 'مقدار وارد شده معتبر نمی باشد'
                        }
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
                        {
                            whitespace: true,
                            message: 'مقدار وارد شده معتبر نمی باشد'
                        }
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
                        {
                            whitespace: true,
                            message: 'مقدار وارد شده معتبر نمی باشد'
                        }
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
                        {
                            whitespace: true,
                            message: 'مقدار وارد شده معتبر نمی باشد'
                        },
                        {
                            len: 11,
                            message: 'تعداد کاراکتر باید 11 رقم باشد'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{}} 
                    label="سن"
                    name="age"
                    rules={[
                        {
                        required: true,
                        message: 'لطفا سن خود را وارد کنید',
                        },
                    ]}
                >
                    <InputNumber min={1} max={99} style={{display: 'flex'}} />
                </Form.Item>

                <Form.Item
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        textAlign: 'center',
                    }}
                    label="جنسیت"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'لطفا جنسیت را انتخاب کنید'
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
                    <Button style={{width: '100%', marginTop: '2rem'}} type="primary" htmlType="submit">
                        افزودن
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default AddForm;
