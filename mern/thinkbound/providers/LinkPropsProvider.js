import React, { createContext, useState } from "react";
export const LinkPropsContext = createContext("linkProps");

const LinkPropsProvider = ({ children }) => {
    const [linkProps, setLinkProps] = useState({});

    return (
        <LinkPropsContext.Provider value={{linkProps, setLinkProps}}>
            {children}
        </LinkPropsContext.Provider>
    );
};

export default LinkPropsProvider;
