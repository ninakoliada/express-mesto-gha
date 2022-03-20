import '../styles/Input.css';

const Input = ({ className, value, onChange, id, name, placeholder, required, minLength, maxLength, inputRef, type, theme = 'white' }) => {
    const inputClassName = `input input_theme_${theme} ${className ? className : ''}`;

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            id={id}
            name={name}
            className={inputClassName}
            type={type}
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
        />
    )
}

export default Input;