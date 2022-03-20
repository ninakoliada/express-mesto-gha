import { Switch, Route, Link } from 'react-router-dom';

import logo from '../images/logo.svg';
import '../styles/Header.css';

const Header = ({ email, onLoggoutClick }) => {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            <div className='header__nav'>
                <Switch>
                    <Route path="/sign-in">
                        <Link className="header__link" to="/sign-up">Регистрация</Link>
                    </Route>
                    <Route path="/sign-up">
                        <Link className="header__link" to="/sign-in">Войти</Link>
                    </Route>
                    <Route path="/">
                        <span className="header__email">{email}</span>
                        <Link to="/sign-in" className="header__link header__logout" onClick={onLoggoutClick}>Выйти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;