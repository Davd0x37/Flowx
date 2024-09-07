import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '~/assets/icons';
import { Button } from '~ui/button';

export const NotFound = () => {
  const navigate = useNavigate();
  const goBackBtn = () => navigate('/');

  return (
    <div className="m-auto flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h3 className="text-5xl">
          <span className="text-sky-700">[404]</span> Looks like we are missing a page
        </h3>

        <Button className="text-lg" onClick={goBackBtn}>
          <ArrowLeft className="mr-2" /> Go back
        </Button>
      </div>
    </div>
  );
};
