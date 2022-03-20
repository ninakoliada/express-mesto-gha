import editButton from '../images/edit_button.svg';
import addButton from '../images/add_button.svg';
import Button from './Button';

const Profile = ({ name, about, avatar, onEditProfile, onAddPlace, onEditAvatar }) => {
    return (
        <section className="profile">
            <div className="profile__avatar-container" onClick={onEditAvatar}>
                <img className="profile__avatar" src={avatar} alt={name}/>
                <div className="profile__avatar-edit"></div>   
            </div>
            <div className="profile__info">
                <div className="profile__content">
                    <h1 className="profile__name">{name}</h1>
                    <Button theme="transparent" type="button" className="profile__edit-button" size="s" onClick={onEditProfile}>
                        <img src={editButton} alt="Кнопка редактировать профиль"/>
                    </Button>
                </div>
                <p className="profile__about">{about}</p>
            </div>
            <Button type="button" size="l" theme="transparent" className="profile__add-button" onClick={onAddPlace}>
                <img className="profile__add-image" src={addButton} alt="Кнопка добавить"/>
            </Button>
        </section>
    )
}

export default Profile;