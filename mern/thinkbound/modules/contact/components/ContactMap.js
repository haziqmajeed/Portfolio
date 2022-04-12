import React, { useContext } from 'react';
import { CursorContext } from './../../../providers/CursorProvider';

const ContactMap = () => {
    
    let { handleHide, handleLeave } = useContext(CursorContext);

    return (
        <div className="contact__map-wrapper">
            <iframe
                className="contact__map"
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.3374220473384!2d-79.33793088427534!3d43.724316855846624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd09e766292d%3A0xd753673901d255db!2zNDAgV3luZm9yZCBEciwgTm9ydGggWW9yaywgT04gTTNDIDFKNSwg0JrQsNC90LDQtNCw!5e0!3m2!1sru!2sua!4v1626094699256!5m2!1sru!2sua"
                allowFullScreen
                loading="lazy"
                onMouseOver={handleHide}
                onMouseLeave={handleLeave}
            />
        </div>
    )
}

export default ContactMap
