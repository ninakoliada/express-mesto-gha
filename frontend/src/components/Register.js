import Input from "./Input";
import Button from "./Button";

import '../styles/Register.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onChangeHandler (e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }
    
    function onSubmitHandler (e) {
        e.preventDefault();

        onRegister(email, password);
    }

    return (
        <form className="register" onSubmit={onSubmitHandler}>
            <h2 className="register__title">Регистрация</h2>
            <Input value={email} onChange={onChangeHandler} name="email" type="email" className="register__input" theme="dark" placeholder="Email" />
            <Input value={password} onChange={onChangeHandler} name="password" type="password" className="register__input" theme="dark" placeholder="Пароль" />
            <Button type="submit" theme="white" size="l" className="register__button">Зарегистрироваться</Button>
            <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </form>
    )
}

export default Register;