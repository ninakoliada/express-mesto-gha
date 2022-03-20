import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/CurrentUserContext";
import Input from "./Input";

import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = useContext(UserContext);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    function onChange(event) {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'about') {
            setAbout(event.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({ name, about });
      } 

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Редактировать профиль" name="profile" buttonText="Сохранить">
          <label className="popup__form-field">
            <Input value={name || ''} onChange={onChange} id="user-name" type="text" name="name" placeholder="ФИО" required minLength="2" maxLength="40" />
            <span className="popup__error user-name-error"></span>
          </label>
          <label className="popup__form-field">
            <Input value={about || ''} onChange={onChange} id="user-about" type="text" name="about" placeholder="Род занятий" required minLength="2" maxLength="200" />
            <span className="popup__error user-about-error"></span>
          </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;