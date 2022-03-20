import "../styles/Button.css";

const Button = ({ type, theme, size, children, className, onClick }) => {
    const buttonClassName = `button ${size ? `button_size_${size}` : ''} ${theme ? `button_theme_${theme}` : ''} ${className ? className : ''}`;

    return (
        <button type={type} className={buttonClassName} onClick={onClick}>{children}</button>
    );
}

export default Button;