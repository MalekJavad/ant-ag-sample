import React from "react";

import "./App.css";

import UserPanel from "./pages/UserPanel.jsx";
import { ConfigProvider } from 'antd';

// import UserContextProvider from "./context/user-context/user-context";


const App = () => {
  return (
    // <UserContextProvider>
      <main>
        <ConfigProvider theme={{token: {fontFamily: 'Vazir-FD' } }}>
          <UserPanel />
        </ConfigProvider>
      </main>
    // </UserContextProvider>
  );
};

export default App;
