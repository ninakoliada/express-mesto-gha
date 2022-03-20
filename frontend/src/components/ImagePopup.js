import Button from './Button';

const ImagePopup = ({ card, onClose }) => {
    const { name, link } = card || {};
    const className = `popup page__image-popup ${card ? 'popup_visibility_visible' : ''}`;

    return (
        <div className={className} >
            <div className="popup__background popup__background_opasity_dark" onClick={onClose}></div>
            <div className="popup__content">
                <img className="popup__image" alt={name} src={link}/>
                <h3 className="popup__description">{name}</h3>
                <Button type="button" className="button popup__close" onClick={onClose}></Button>
            </div>
        </div>
    )
}

export default ImagePopup;