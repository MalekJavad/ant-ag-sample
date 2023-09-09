import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { message, Button } from 'antd';

import axios from 'axios';

import "./UserGrid.css";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// import { UserContext } from '../../context/user-context/user-context';


const UserGrid = () => {
    // const userContext = useContext(UserContext);
    const [reload, setReload] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const key = "addUser";

    const actionCellRenderer = p => {
        const deleteAction = () => {
            messageApi.open({key, type: 'loading', content: 'در حال حذف رکورد...'});

            axios.delete(`http://localhost:8000/users/${p.data.id}`)
            .then((response) => {
                messageApi.open({key, type: 'success', content: 'رکورد با موفقیت حذف شد', duration: 2});
                setTimeout(()=> setReload(true), 500);
            })
            .catch((err) => {
                setTimeout(()=>{messageApi.open({key, type: 'error', content: 'خطایی در حذف رکورد رخ داد', duration: 2});}, 500);
            });
        }
    
        return (
            <>
                <Button danger htmlType="button" onClick={deleteAction} size=''>حذف رکورد</Button>
            </>
        )
    }

    const [columnDef] = useState([
        {field: 'id', sortable: true, headerName: 'شناسه', width: 90},
        {field: 'name', sortable: true, headerName: 'نام',},
        {field: 'surname', sortable: true, headerName: 'نام خانوادگی'},
        {field: 'code', sortable: true, headerName: 'کد ملی', width: 150},
        {field: 'phone', sortable: true, headerName: 'شماره موبایل', width: 150},
        {field: 'age', sortable: true, headerName: 'سن', width: 80},
        {field: 'gender', sortable: true, headerName: 'جنسیت', width: 100},
        {field: 'action', headerName: 'عملیات', cellRenderer: actionCellRenderer, width: 130}
    ]);

    const [rowData, setRowData] = useState([]);

    const defaultColDef = useMemo(() => {
        return {
          sortable: true,
          filter: true,
          resizable: true,
        };
      }, []);

    useEffect(()=>{
        messageApi.open({key, type: 'loading', content: 'در حال بارگزاری...'});

        axios.get('http://localhost:8000/users')
        .then((response) => {
            const dataObject = response.data;
            const dataList = [];
            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    dataList.push(dataObject[key]);
                }
            }
            setTimeout(()=>{ messageApi.open({key, type: 'success', content: 'بارگزاری شد', duration: 2});}, 500)
            setRowData(dataList);
        })
        .catch((err) => {
            setTimeout(()=>{messageApi.open({key, type: 'error', content: 'خطایی در بارگزاری اطلاعات رخ داد', duration: 2});}, 500)
        });
        setReload(false);
        // setRowData(userContext.users);
    }, [messageApi, reload])

    return (
        <div className="ag-theme-alpine"
        style={
            {
                height: '30rem', 
                width: '70rem', 
                textAlign: 'left', 
                fontFamily: 'Vazir-FD',
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
            />
        </div>
    );
};

export default UserGrid;
