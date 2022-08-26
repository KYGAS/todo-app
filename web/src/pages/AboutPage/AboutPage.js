import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <h1>Project description</h1>
      <hr></hr>
      <p>
        This is a test project to assess my knowledge gain over the past week while working with Stuntcoders.
      </p>
      <br></br>
      <p>
        <Link to={routes.home()}>Project Home</Link>
      </p>
    </>
  )
}

export default AboutPage
