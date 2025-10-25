import { Outlet } from 'react-router-dom'
import NavBar from './pages/NavBar'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Layout

/**
 * 
 * Now, what this Outlet stands for is it basically leaves a space in the JSX of this layout 
 * component that the matching page for the current route will be rendered into, right? 
 * So this outlet basically represents whatever page is currently being displayed.
 */