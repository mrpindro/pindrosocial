import { createContext, useEffect, useState } from "react";

const DataContext = createContext();


export const ContextProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId ] = useState(null);
    const [postData, setPostData] = useState({ 
        title: '', message: '', tags: ''
    });

    useEffect(() => {
        if (visible) {
            setVisible(true);
        } else {
            setVisible(false)
        }
    }, [visible])

    return (
        <DataContext.Provider value={{
            visible, setVisible,
            currentId, setCurrentId,
            postData, setPostData
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext