import type { FallbackProps } from 'react-error-boundary'
import { Alert, AlertDescription, AlertTitle } from '~ui/alert'
import { Button } from '~ui/button'
import { AlertTriangleIcon, ReloadIcon } from '~/assets/icons'

interface ErrorPageProps extends FallbackProps {
  error: {
    message?: string
  }
  refreshPageFn?: () => void
}

function ErrorPage({
  error,
  refreshPageFn = undefined,
  resetErrorBoundary,
}: ErrorPageProps) {
  return (
    <div className="m-auto flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h3 className="max-w-screen-lg text-5xl">
          We're currently experiencing difficulties displaying the website for
          you.
        </h3>

        <Alert variant="destructive">
          <AlertTriangleIcon className="size-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>

        <Button
          className="text-lg"
          onClick={() => {
            resetErrorBoundary()
            if (typeof resetErrorBoundary === 'function') {
              resetErrorBoundary()
            }

            if (typeof refreshPageFn === 'function') {
              refreshPageFn()
            } else {
              window.location.reload()
            }
          }}
        >
          Refresh <ReloadIcon className="ml-2" fontSize="1.6rem" />
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
