import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthenticateLayout from 'app/components/layouts/AuthenticateLayout';
import { UserFormModel, UserRegisterFormModel } from 'app/features/user/models/user.model';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Authenticate = () => {
  const { t } = useTranslation(['user']);

  const [loginMode, setLoginMode] = useState(true);
  const modeTitle = useMemo(() => (loginMode ? t('Login') : t('Register')), [loginMode]);

  const handleLogin = (ev: UserFormModel) => {
    console.log(ev);
  };

  const handleRegister = (ev: UserRegisterFormModel) => {
    console.log(ev);
  };

  const toggleMode = () => {
    setLoginMode(!loginMode);
  };

  return (
    <AuthenticateLayout>
      <div className="m-auto flex w-full max-w-lg flex-col justify-center p-5 pt-2">
        <h1 className="mb-12 text-center text-4xl font-bold">{modeTitle}</h1>

        {loginMode ? (
          <LoginForm onSubmit={handleLogin} toggleMode={toggleMode} />
        ) : (
          <RegisterForm onSubmit={handleRegister} toggleMode={toggleMode} />
        )}
      </div>
    </AuthenticateLayout>
  );
};

export default Authenticate;
