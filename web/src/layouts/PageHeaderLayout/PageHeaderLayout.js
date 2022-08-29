import { Link, routes } from "@redwoodjs/router"

const PageHeaderLayout = ({ children }) => {
  return (
  <>
      <h1><Link to={routes.home()}>To-Do WebApp</Link></h1>
      <hr></hr>
      <main>
        {children}
      </main>
  </>
  )
}

export default PageHeaderLayout
