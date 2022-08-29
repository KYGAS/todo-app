import { useAuth } from "@redwoodjs/auth"
import { Link, routes } from "@redwoodjs/router"

const PageHeaderLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
  <>
      <h1><Link to={routes.home()}>To-Do WebApp</Link>
        {isAuthenticated ? (
          <div>
            <span>Logged in as {currentUser.email}</span>{' '}
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </h1>
      <hr></hr>
      <main>
        {children}
      </main>
  </>
  )
}

export default PageHeaderLayout
