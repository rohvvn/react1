import { Outlet, createRootRoute } from '@tanstack/react-router'
import AuthButton from '../components/Authentication'

export const Route = createRootRoute({
  component: () => (
    <div>
      <AuthButton />
      <hr />
      <Outlet />
    </div>
  ),
})
