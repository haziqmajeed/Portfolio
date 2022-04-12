import React, { useContext } from 'react'
import { CursorContext } from './../providers/CursorProvider';
import { useState } from 'react';

let EMPTY_FORM = {
    name: '',
    company: '',
    email: '',
    phone: '',
    comment: ''
};

export default function Form({ editingForm, className, Button, storage }) {
    console.log("storage",storage)
    const [formState, setForm] = useState(editingForm || EMPTY_FORM);

    let onInputChange = (e) => {
        setForm({
            ...formState, [e.target.name]: e.target.value
        });
    };

    let { handleHover, handleLeave } = useContext(CursorContext);

    return (
        <form className={"form " + (className || "")}>
            <div className="input-wrapper input-wrapper--form form__input-wrapper form__input-wrapper--50 input-wrapper--50">
                <label htmlFor="name" className="input-wrapper__label input-wrapper__label--white">Name*</label>
                <input name="name" className="input input-wrapper__input" id="name" onMouseOver={handleHover} onMouseLeave={handleLeave} onChange={onInputChange} value={formState.name} />
            </div>
            <div className="input-wrapper input-wrapper--form form__input-wrapper form__input-wrapper--50 input-wrapper--50">
                <label htmlFor="company" className="input-wrapper__label input-wrapper__label--white">Company*</label>
                <input name="company" className="input input-wrapper__input" id="company" onMouseOver={handleHover} onMouseLeave={handleLeave} onChange={onInputChange} value={formState.company} />
            </div>
            <div className="input-wrapper input-wrapper--form form__input-wrapper form__input-wrapper--50 input-wrapper--50">
                <label htmlFor="email" className="input-wrapper__label input-wrapper__label--white">Email*</label>
                <input name="email" className="input input-wrapper__input" id="email" onMouseOver={handleHover} onMouseLeave={handleLeave} onChange={onInputChange} value={formState.email} />
            </div>
            <div className="input-wrapper input-wrapper--form form__input-wrapper form__input-wrapper--50 input-wrapper--50">
                <label htmlFor="phone" className="input-wrapper__label input-wrapper__label--white">Phone*</label>
                <input name="phone" className="input input-wrapper__input" id="phone" onMouseOver={handleHover} onMouseLeave={handleLeave} onChange={onInputChange} value={formState.phone} />
            </div>
            <div className="input-wrapper input-wrapper--form form__input-wrapper">
                <label htmlFor="service" className="input-wrapper__label input-wrapper__label--white">{storage ? "Web design I am interested in:" : "Interested Service*"}</label>
                <div className="select-wrapper" onMouseOver={handleHover} onMouseLeave={handleLeave}>
                    <select className="select-wrapper__select input" id="service">
                        <option value="0"></option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select>
                </div>
            </div>
            <div className="input-wrapper input-wrapper--form form__input-wrapper">
                <label htmlFor="comment" className="input-wrapper__label input-wrapper__label--white">Comment</label>
                <textarea
                    name="comment"
                    className="input input--textarea input-wrapper__input input-wrapper__input--textarea" id="comment"
                    onMouseOver={handleHover}
                    onMouseLeave={handleLeave}
                    onChange={onInputChange}
                    value={formState.comment}
                ></textarea>
            </div>
            {Button}
        </form>
    )
}
