import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/automations/')({
  component: () => (
    <>
      <div>Automations</div>
    </>
  ),
})
