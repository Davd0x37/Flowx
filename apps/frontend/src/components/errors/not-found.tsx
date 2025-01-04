import { useNavigate } from '@tanstack/react-router'
import { Button } from '~ui/button'
import { ArrowLeftIcon } from '~/assets/icons'

function NotFound() {
  const navigate = useNavigate()
  const goBackBtn = () => navigate({ to: '/' })

  return (
    <div className="m-auto flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h3 className="text-5xl">
          <span className="text-red-700">[404]</span>
          <span>Looks like we are missing a page</span>
        </h3>

        <Button className="text-lg" onClick={goBackBtn}>
          <ArrowLeftIcon className="mr-2" /> Go back
        </Button>
      </div>
    </div>
  )
}

export default NotFound
