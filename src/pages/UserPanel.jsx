import React, {useState} from "react";

import "./UserPanel.css";

import { UserAddOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Col, Row, Menu, Space } from 'antd';

const items = [
    {
      label: 'افزودن کاربر',
      key: 'add',
      icon: <UserAddOutlined />,
    },
    {
        label: 'لیست کاربران',
        key: 'list',
        icon: <DatabaseOutlined />,
    },
];

const UserPanel = () => {
    const [current, setCurrent] = useState('add');

    const tabClick = e => {
        setCurrent(e.key);
    };

    return (    
        <Row justify="space-around" align="middle">
            <Col span={12} flex="1 1 200px">
                <Space
                // direction="vertical"
                className="container"
                size={[0, 50]}
                >
                    <Menu onClick={tabClick} selectedKeys={[current]} mode="horizontal" items={items} />
                </Space>
            </Col>
        </Row>
    );
};

export default UserPanel;
