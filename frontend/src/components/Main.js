import { useContext } from "react";
import Profile from "./Profile";
import Card from "./Card";
import { UserContext } from "../contexts/CurrentUserContext";

const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(UserContext);

    return (
        <main>
            <Profile avatar={currentUser.avatar} name={currentUser.name} about={currentUser.about} onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} />
            <section className="gallery">
                {cards.map((item) => {
                    return (
                        <Card
                            key={item._id}
                            card={item}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    )
                })}
            </section>
        </main>
    )
}

export default Main;