import { useContext, useEffect } from 'react'
import { CursorContext } from './../providers/CursorProvider';

export default function useSetTargets() {
    let { setTargets } = useContext(CursorContext);
    
    useEffect(() => {
        setTargets({
            hoverTargets: document.querySelectorAll('a, button'),
            grabTargets: document.querySelectorAll('[style]')
        });
    }, [setTargets]);
}
