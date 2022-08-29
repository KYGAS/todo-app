import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <p>
        Welcome to the to-do website! Please log in to proceed or check out our about page to learn more!
      </p>
      <br></br>
      <p>
        <Link to={routes.about()}>About the project</Link>
      </p>
      <p>
        <Link to={routes.login()}>Log In</Link>
      </p>
      <p>
        <Link to={routes.signup()}>Sign Up</Link>
      </p>
    </>
  )
}

export default HomePage
