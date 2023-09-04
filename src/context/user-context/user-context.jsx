import React, {createContext, useState} from "react";

export const UserContext = createContext({
    users: [],
    addUser: () => {},
});

const UserContextProvider = (props) => {
    const [users, setUsers] = useState([]);

    const pushUser = user => {
        const toChangeUsers = [...users];
        toChangeUsers.push(user);
        setUsers(toChangeUsers);
    };

    return (
        <UserContext.Provider
            value={{
                users: users,
                addUser: pushUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
