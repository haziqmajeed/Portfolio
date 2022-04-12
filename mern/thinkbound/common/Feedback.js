import React from 'react';
import icon from '../icons/thinkbound.png';
import Button from './Button';


export default function Feedback({ className, togglePopup, callButtonLink, callButtonText, title }) {
    return (
        <div className={"feedback " + className}>
            <div className="feedback__wrapper container">
                <h1 className="feedback__title" dangerouslySetInnerHTML={{__html: title}} />
                <div className="feedback__buttons">
                    <Button type="button" className="feedback__button" icon={icon} text="Start Project" onClick={togglePopup} />
                    <Button type="link" href={callButtonLink} className="feedback__button" text={callButtonText} />
                </div>
            </div>
        </div>
    )
}
