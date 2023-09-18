import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { message, Button, Modal, Row } from 'antd';

import axios from 'axios';

import { ExclamationCircleFilled } from '@ant-design/icons';
import "./UserGrid.css";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// import { UserContext } from '../../context/user-context/user-context';


const { confirm } = Modal;

const UserGrid = () => {
    // const userContext = useContext(UserContext);
    const [reload, setReload] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const key = "addUser";

    const [columnDef] = useState([
        { field: 'id', sortable: true, headerName: 'شناسه', width: 120, checkboxSelection: true, },
        { field: 'name', sortable: true, headerName: 'نام', editable: true },
        { field: 'surname', sortable: true, headerName: 'نام خانوادگی', editable: true },
        { field: 'code', sortable: true, headerName: 'کد ملی', width: 180, editable: true },
        { field: 'phone', sortable: true, headerName: 'شماره موبایل', width: 180, editable: true },
        { field: 'age', sortable: true, headerName: 'سن', width: 115, editable: true },
        { field: 'gender', sortable: true, headerName: 'جنسیت', width: 115, editable: true },
    ]);

    const [rowData, setRowData] = useState([]);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    const onCellValueChanged = useCallback((event) => {
        console.log('Data after change is', event.data);
        axios.put(`http://localhost:8000/users/${event.data.id}`, {
            ...event.data
        })
            .then((response) => {
                setTimeout(() => {
                    messageApi.open({ key, type: 'success', content: 'به روز رسانی شد', duration: 2 });
                }, 500);
            })
            .catch((err) => {
                setTimeout(() => {
                    messageApi.open({ key, type: 'error', content: 'به روز رسانی با خطا مواجه شد', duration: 2 });
                }, 500);
            })
    }, [messageApi]);

    useEffect(() => {
        messageApi.open({ key, type: 'loading', content: 'در حال بارگزاری...' });

        axios.get('http://localhost:8000/users')
            .then((response) => {
                const dataObject = response.data;
                const dataList = [];
                for (const key in dataObject) {
                    if (dataObject.hasOwnProperty(key)) {
                        dataList.push(dataObject[key]);
                    }
                }
                setTimeout(() => {
                    messageApi.open({ key, type: 'success', content: 'بارگزاری شد', duration: 2 });
                    setRowData(dataList);
                }, 500);
            })
            .catch((err) => {
                setTimeout(() => { messageApi.open({ key, type: 'error', content: 'خطایی در بارگزاری اطلاعات رخ داد', duration: 2 }); }, 500);
            });
        setReload(false);
        // setRowData(userContext.users);
    }, [messageApi, reload]);

    const [selectedRows, setSelectedRows] = useState([]);

    const onRowSelected = useCallback((event) => {
        const rows = event.api.getSelectedRows();
        setSelectedRows(rows);
    }, []);

    const groupDeleteHandler = () => {
        if (selectedRows.length === 0) {
            return;
        }
        confirm({
            title: 'آیا از حذف کردن این رکوردها اطمینان دارید؟',
            icon: <ExclamationCircleFilled />,
            style: { fontFamily: 'Vazir-FD', },
            cancelText: 'خیر',
            okText: 'بله',
            onOk() {
                return new Promise((resolve, reject) => {
                    selectedRows.map((row) => {
                        return (
                            setTimeout(() => {
                                axios.delete(`http://localhost:8000/users/${row.id}`)
                                    .then((response) => {
                                        messageApi.open({ key, type: 'success', content: 'رکوردها با موفقیت حذف شدند', duration: 2 });
                                        resolve();
                                        setReload(true);
                                    })
                                    .catch((err) => {
                                        setTimeout(() => {
                                            messageApi.open({ key, type: 'error', content: 'خطایی در حذف رکوردها رخ داد', duration: 2 });
                                            resolve();
                                        }, 500);
                                    })
                            }, 10)
                        )
                    });
                    setSelectedRows([]);
                })
            },
            onCancel() { }
        })
    }

    return (
        <>
            <Row style={{ margin: '1rem' }}>
                {selectedRows.length === 0 ?
                    <Button danger disabled>حذف رکوردها</Button>
                    :
                    <Button danger onClick={groupDeleteHandler}>حذف رکوردها</Button>
                }

            </Row>
            <div className="ag-theme-alpine"
                style={
                    {
                        height: '30rem',
                        width: '70rem',
                        textAlign: 'left',
                    }}
            >
                {contextHolder}
                <AgGridReact
                    enableRtl={true}
                    rowData={rowData}
                    columnDefs={columnDef}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    animateColumn={true}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={'multiple'}
                    onRowSelected={onRowSelected}
                />
            </div>
        </>
    );
};

export default UserGrid;
