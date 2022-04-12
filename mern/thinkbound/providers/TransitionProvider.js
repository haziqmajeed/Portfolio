import React, { createContext, useState } from "react";
import Transition from "../common/Transition";
export const TransitionContext = createContext("transitionContext");
// <Transition playTransition={playTransition}/>
const TransitionProvider = ({ children }) => {
    const [playTransition, setPlayTransition] = useState(false);

    return (
        <TransitionContext.Provider value={{setPlayTransition}}>
            {children}
            <Transition playTransition={playTransition}/>
        </TransitionContext.Provider>
    );
};

export default TransitionProvider;
