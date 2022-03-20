import Button from './Button';

const PopupWithForm = ({ name, title, isOpen, onClose, children, onSubmit, buttonText }) => {
    const className = `popup ${isOpen ? 'popup_visibility_visible' : ''}`;

    return (
        <div className={className}>
            <div className="popup__background" onClick={onClose}></div>
            <div className="popup__body">
                <h3 className="popup__text">{title}</h3>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <Button type="submit" theme="dark" className="popup__button" size="l">{buttonText}</Button>
                </form>
                <Button type="button" className="popup__close" onClick={onClose}></Button>
            </div>
        </div>
    )
}

export default PopupWithForm;