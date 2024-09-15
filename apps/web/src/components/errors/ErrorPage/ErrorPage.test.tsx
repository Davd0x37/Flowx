import { ErrorPage } from './ErrorPage'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

const refreshPageFn = vi.fn()

describe('ErrorPage', () => {
  it('renders the ErrorPage component', async () => {
    render(
      <ErrorPage
        refreshPageFn={refreshPageFn}
        resetErrorBoundary={() => null}
        error={{
          message: 'test error message',
        }}
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
