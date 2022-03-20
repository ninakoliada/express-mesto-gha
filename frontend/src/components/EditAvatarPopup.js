import { useRef } from "react";
import PopupWithForm from './PopupWithForm';
import Input from './Input';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar(inputRef.current.value);
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Обновить аватар" name="avatar" buttonText="Сохранить">
          <label className="popup__form-field">
            <Input inputRef={inputRef} id="avatar-link" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__error avatar-link-error"></span>
          </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;