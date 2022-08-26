import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const OrganisationOnProjectsLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.organisationOnProjects()} className="rw-link">
            OrganisationOnProjects
          </Link>
        </h1>
        <Link
          to={routes.newOrganisationOnProject()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New OrganisationOnProject
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default OrganisationOnProjectsLayout
