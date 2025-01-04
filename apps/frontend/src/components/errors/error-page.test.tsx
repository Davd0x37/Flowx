import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import ErrorPage from './error-page'
import '@testing-library/jest-dom'

const refreshPageFn = vi.fn()

describe('errorPage', () => {
  it('renders the ErrorPage component', async () => {
    render(
      <ErrorPage
        error={{
          message: 'test error message',
        }}
        refreshPageFn={refreshPageFn}
        resetErrorBoundary={() => null}
      />,
    )

    const centeredText = screen.getByRole('heading', { level: 3 })
    const refreshButton = screen.getByRole('button')

    expect(centeredText).toBeInTheDocument()
    expect(refreshButton).toBeInTheDocument()

    await userEvent.click(refreshButton)

    expect(refreshPageFn).toHaveBeenCalledTimes(1)
  })
})
