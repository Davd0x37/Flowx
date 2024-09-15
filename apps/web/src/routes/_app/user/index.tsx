import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/user/')({
  component: () => (
    <>
      <div>User index</div>
    </>
  ),
})
