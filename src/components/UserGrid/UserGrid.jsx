import React, { useState, useContext, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import "./UserGrid.css";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { UserContext } from '../../context/user-context/user-context';

const UserGrid = () => {
    const userContext = useContext(UserContext);

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
        setRowData(userContext.users);
        console.log('ue in Grid', userContext.users)
    }, [userContext.users])

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
