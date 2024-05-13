import { Reload } from 'app/assets/icons';
import { Button } from 'app/components/ui/button';

interface ErrorPageProps {
  refreshPageFn?: () => void;
}

export const ErrorPage = ({ refreshPageFn = () => window.location.reload() }: ErrorPageProps) => {
  return (
    <div className="m-auto flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h3 className="max-w-[90%] text-center text-5xl [text-wrap:balance]">
          We're currently experiencing difficulties displaying the website for you.
        </h3>

        <Button className="text-lg" onClick={() => refreshPageFn()}>
          Refresh <Reload className="ml-2" fontSize="1.6rem" />
        </Button>
      </div>
    </div>
  );
};
