import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { message } from 'antd';

import axios from 'axios';

import "./UserGrid.css";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// import { UserContext } from '../../context/user-context/user-context';

const UserGrid = () => {
    // const userContext = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();
    const key = "addUser";

    const [columnDef] = useState([
        {field: 'name', sortable: true, headerName: 'نام'},
        {field: 'surname', sortable: true, headerName: 'نام خانوادگی'},
        {field: 'code', sortable: true, headerName: 'کد ملی'},
        {field: 'phone', sortable: true, headerName: 'شماره موبایل'},
        {field: 'age', sortable: true, headerName: 'سن'},
        {field: 'gender', sortable: true, headerName: 'جنسیت'},
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

        axios.get('https://usergrid-71604-default-rtdb.firebaseio.com/users.json')
        .then((response) => {
            const dataObject = response.data;
            const dataList = [];
            for (const key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    dataList.push(dataObject[key]);
                }
            }
            messageApi.open({key, type: 'success', content: 'بارگزاری شد', duration: 2});
            setRowData(dataList);
        })
        .catch((err) => {
            messageApi.open({key, type: 'error', content: 'خطایی در بارگزاری اطلاعات رخ داد', duration: 2});
        });

        // setRowData(userContext.users);
    }, [])

    return (
        <div className="ag-theme-alpine"
        style={
            {
                height: '30rem', 
                width: '76rem', 
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
