import useWindowSize from '@charlietango/use-window-size';
import React from 'react';

const Spacer = ({desktop, mobile, bgColor}) => {
    const { width } = useWindowSize();
    // {(width > 768 ? <DeskSlider /> : <MobSlider />)}
    const Desk = `${desktop}px` ?? '60px';
    const Mob = `${mobile}px` ?? '60px';

    const Height = width > 768 ? Desk : Mob;
    const BG = bgColor ? bgColor : 'transparent'

    return (
        <div style={{height : Height, backgroundColor: BG}}>
            
        </div>
    )
}

export default Spacer
