import { PropsWithChildren } from 'react';

const ErrorLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen flex-row gap-6 font-sans text-base antialiased transition-colors">
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ErrorLayout;
