import React, { useEffect, useState } from 'react';
import { ButtonWelcomeProps } from '../interface/ui/buttonWelcome';
import '../styles/ui/buttonWelcome.scss';
import ButtonLoading from '../loading/isLoading';
import { useNavigate } from 'react-router-dom';

const ButtonWelcome: React.FC<ButtonWelcomeProps> = ({body}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const clickLoading = () => {
    setLoading(true);
    navigate('/main');
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/main');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (

    <>
      {loading ? (
        <ButtonLoading />
      ) : (
        <button className='button' onClick={clickLoading}>
          {body ? body : "Welcome"}
        </button>)
      }
    </>
  )
}

export default ButtonWelcome