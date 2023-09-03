import React from "react";

import "./App.css";

import UserPanel from "./pages/UserPanel.jsx";
import { ConfigProvider } from 'antd';


const App = () => {
  return (
    <main>
      <ConfigProvider theme={{token: {fontFamily: 'Vazir-FD' } }}>
        <UserPanel />
      </ConfigProvider>
    </main>
  );
};

export default App;
