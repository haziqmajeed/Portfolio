import React, { useContext, useState } from 'react';
import { CursorContext } from './../providers/CursorProvider';

export default function Accordion({ title, accordions }) {

    let { handleHover, handleLeave } = useContext(CursorContext);
    const [content, setContent] = useState(accordions);

    function handleButtonClick(e, id) {
        setContent(content.map((item, index) => index === id ? { ...item, opened: !item.opened } : item));
        let faq = content.find((item, index) => index === id);
        let button = e.currentTarget;
        let group = button.closest('[data-group]');
        let wrapper = group.querySelector('[data-wrapper]');
        let contentElement = group.querySelector('[data-content]');
        wrapper.style.height = faq.opened ? 0 : contentElement.clientHeight + 'px';
    }

    return (
        <div className={"accordion container accordion--service"}>
            <h2 className="accordion__title">{title}</h2>
            <ul className="accordion__groups">
                {content.map((item, index) => {
                    return (
                        <li className="accordion__group" key={index} data-group>
                            <button className={"accordion__button" + (item.opened ? " active" : "")} onClick={(e) => {
                                handleButtonClick(e, index);
                            }} onMouseOver={handleHover} onMouseLeave={handleLeave}>
                                <span>{item.title}</span>
                                <span className="accordion__button-plus"></span>
                            </button>
                            <div className="accordion__wrapper" data-wrapper>
                                <div className="accordion__content" data-content>
                                    <p className="accordion__text">{item.text}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
