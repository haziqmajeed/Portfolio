import React, { createContext, useState } from "react";
export const MobileNavButtonContext = createContext("mobileMenuShow");

const MobileNavButtonProvider = ({ children }) => {
    const [mobileMenuShow, setMobileMenuShow] = useState(false);

    return (
        <MobileNavButtonContext.Provider value={{mobileMenuShow, setMobileMenuShow}}>
            {children}
        </MobileNavButtonContext.Provider>
    );
};

export default MobileNavButtonProvider;