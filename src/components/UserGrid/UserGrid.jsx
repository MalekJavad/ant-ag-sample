import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const UserGrid = () => {

    const [columnData, setColumnData] = useState([
        {field: 'name'},
        {field: 'surname'},
        {field: 'code'},
        {field: 'phone'},
        {field: 'age'},
        {field: 'gender'},
    ]);

    const [rowData, setRowData] = useState([
        {name: 'javad', surname: 'malek', code: '125', phone: '09103613327', age: '22', gender: 'male'},
        {name: 'javad', surname: 'malek', code: '125', phone: '09103613327', age: '22', gender: 'male'},
        {name: 'javad', surname: 'malek', code: '125', phone: '09103613327', age: '22', gender: 'male'},
        {name: 'javad', surname: 'malek', code: '125', phone: '09103613327', age: '22', gender: 'male'},
    ]);

    return (
        <div className='ag-theme-alpine' style={{height: '30rem', width: '76rem', textAlign: 'left'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnData} 
            />
        </div>
    );
};

export default UserGrid;
