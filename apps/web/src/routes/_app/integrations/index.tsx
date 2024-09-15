import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/integrations/')({
  component: () => (
    <>
      <div>Integrations</div>
    </>
  ),
})
