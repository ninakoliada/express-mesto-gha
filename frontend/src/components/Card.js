import { useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import Button from './Button';

const Card = ({card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(UserContext);

    function handleClick () {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }
    
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : ''}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__heart-button ${isLiked ? 'card__heart-button_active' : ''}`; 

    return (
        <div className="gallery__item card">
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="card__section">
                <h4 className="card__text">{card.name}</h4>
                <div className="card__likes">
                    <Button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></Button>
                    <span className="card__likes-count">{card.likes.length}</span>
                </div>
            </div>
            <Button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></Button>
        </div>
    )
}

export default Card;