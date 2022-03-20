import Button from './Button';

import '../styles/InfoTooltip.css';

import successImage from '../images/success.svg';
import failedImage from '../images/failed.svg';

const InfoTooltip = ({ isOpen, onClose, type }) => {
    const className = `popup ${isOpen ? 'popup_visibility_visible' : ''}`;

    return (
        <div className={className}>
            <div className="popup__background" onClick={onClose}></div>
            <div className="popup__body">
                {type === 'success' && (
                    <>       
                        <img className='info-tooltip__image' alt="Успешно" src={successImage} />
                        <p className='info-tooltip__text'>Вы успешно зарегистрировались!</p>
                    </>
                )}

                {type === 'failed' && (
                    <>
                        <img className='info-tooltip__image' alt="Ошибка"  src={failedImage} />
                        <p className='info-tooltip__text'>Что-то пошло не так! Попробуйте ещё раз.</p>
                    </>
                )}
                <Button type="button" className="popup__close" onClick={onClose}></Button>
            </div>
        </div>
    )
}

export default InfoTooltip;