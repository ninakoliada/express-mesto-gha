import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom"
import { api } from "../utils/api";
import { UserContext } from '../contexts/CurrentUserContext';

import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth';

const App = () => {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipType, setTooltipType] = useState('success');
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);

            if (history.location.pathname !== '/') {
              history.push('/')
            }
          } else {
            setLoggedIn(false);
            setEmail('');
            history.push('/sign-in')
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [loggedIn, history]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true)
  }

  function onAddPlace() {
    setIsPlacePopupOpen(true)
  }
  
  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true)
  }
  function onCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((newUserData) => {
        closeAllPopups();
        setCurrentUser(newUserData);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error)
      })
}

  function handleCardDelete(card) {
      api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setTooltipType('success');
        setIsTooltipOpen(true);

        setTimeout(() => handleLogin(email, password), 100);
      })
      .catch(() => onError())
  }

  function handleLogin(email, password) {
      auth.authorize(email, password)
        .then((res) => {
            if (res.token) {
                setLoggedIn(true);
                localStorage.setItem('jwt', res.token);

                history.push('/');
            }
        })
        .catch((err) => {
            onError();
            console.log(err);
        })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function onError() {
    setTooltipType('failed');
    setIsTooltipOpen(true);
  }
  
  function handleCloseTooltip() {
    setIsTooltipOpen(false)
  }

  return (
    <div className="page__content">
      <UserContext.Provider value={currentUser}>
          <Header email={email} onLoggoutClick={handleLogout} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLoggedIn={handleLogin} />
            </Route>
            <ProtectedRoute loggedIn={loggedIn} path="/">
              <Main
                cards={cards}
                onEditProfile={onEditProfile}
                onAddPlace={onAddPlace}
                onEditAvatar={onEditAvatar}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

              <AddPlacePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

              <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            </ProtectedRoute>
          </Switch>
          <InfoTooltip type={tooltipType} isOpen={isTooltipOpen} onClose={handleCloseTooltip} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
