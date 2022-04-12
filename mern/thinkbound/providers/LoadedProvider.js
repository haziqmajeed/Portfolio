import React, { createContext, useEffect, useState } from 'react';

export const LoadedContext = createContext('loadedContext');

export default function LoadedProvider({children}) {

    const [loaded, setLoaded] = useState(true);
  
    useEffect(() => {
        let count = 0;
        let images = document.querySelectorAll('img');
        images.forEach(image => {
            image.addEventListener('load', () => {
                count++;
                if (images.length === count) {
                    setLoaded(true);
                }
            });
        });
    }, []);

    return (
        <LoadedContext.Provider value={loaded}>
            {children}
        </LoadedContext.Provider>
    )
}
