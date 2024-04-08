import { PropsWithChildren } from 'react';

const AuthenticateLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex h-screen w-screen font-sans text-base antialiased transition-colors">{children}</div>;
};

export default AuthenticateLayout;
