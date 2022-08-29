// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import UserOnOrganisationsLayout from 'src/layouts/UserOnOrganisationsLayout'

import OrganisationOnProjectsLayout from 'src/layouts/OrganisationOnProjectsLayout'

import ProjectOnTasksLayout from 'src/layouts/ProjectOnTasksLayout'

import TaskOnMessagesLayout from 'src/layouts/TaskOnMessagesLayout'

import MessagesLayout from 'src/layouts/MessagesLayout'

import TasksLayout from 'src/layouts/TasksLayout'

import ProjectsLayout from 'src/layouts/ProjectsLayout'

import OrganisationsLayout from 'src/layouts/OrganisationsLayout'

import UsersLayout from 'src/layouts/UsersLayout'
import PageHeaderLayout from './layouts/PageHeaderLayout/PageHeaderLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home">
        <Set wrap={UserOnOrganisationsLayout}>
          <Route path="/user-on-organisations/new" page={UserOnOrganisationNewUserOnOrganisationPage} name="newUserOnOrganisation" />
          <Route path="/user-on-organisations/{id:Int}/edit" page={UserOnOrganisationEditUserOnOrganisationPage} name="editUserOnOrganisation" />
          <Route path="/user-on-organisations/{id:Int}" page={UserOnOrganisationUserOnOrganisationPage} name="userOnOrganisation" />
          <Route path="/user-on-organisations" page={UserOnOrganisationUserOnOrganisationsPage} name="userOnOrganisations" />
        </Set>
        <Set wrap={OrganisationOnProjectsLayout}>
          <Route path="/organisation-on-projects/new" page={OrganisationOnProjectNewOrganisationOnProjectPage} name="newOrganisationOnProject" />
          <Route path="/organisation-on-projects/{id:Int}/edit" page={OrganisationOnProjectEditOrganisationOnProjectPage} name="editOrganisationOnProject" />
          <Route path="/organisation-on-projects/{id:Int}" page={OrganisationOnProjectOrganisationOnProjectPage} name="organisationOnProject" />
          <Route path="/organisation-on-projects" page={OrganisationOnProjectOrganisationOnProjectsPage} name="organisationOnProjects" />
        </Set>
        <Set wrap={ProjectOnTasksLayout}>
          <Route path="/project-on-tasks/new" page={ProjectOnTaskNewProjectOnTaskPage} name="newProjectOnTask" />
          <Route path="/project-on-tasks/{id:Int}/edit" page={ProjectOnTaskEditProjectOnTaskPage} name="editProjectOnTask" />
          <Route path="/project-on-tasks/{id:Int}" page={ProjectOnTaskProjectOnTaskPage} name="projectOnTask" />
          <Route path="/project-on-tasks" page={ProjectOnTaskProjectOnTasksPage} name="projectOnTasks" />
        </Set>
        <Set wrap={TaskOnMessagesLayout}>
          <Route path="/task-on-messages/new" page={TaskOnMessageNewTaskOnMessagePage} name="newTaskOnMessage" />
          <Route path="/task-on-messages/{id:Int}/edit" page={TaskOnMessageEditTaskOnMessagePage} name="editTaskOnMessage" />
          <Route path="/task-on-messages/{id:Int}" page={TaskOnMessageTaskOnMessagePage} name="taskOnMessage" />
          <Route path="/task-on-messages" page={TaskOnMessageTaskOnMessagesPage} name="taskOnMessages" />
        </Set>
        <Set wrap={MessagesLayout}>
          <Route path="/messages/new" page={MessageNewMessagePage} name="newMessage" />
          <Route path="/messages/{id:Int}/edit" page={MessageEditMessagePage} name="editMessage" />
          <Route path="/messages/{id:Int}" page={MessageMessagePage} name="message" />
          <Route path="/messages" page={MessageMessagesPage} name="messages" />
        </Set>
        <Set wrap={TasksLayout}>
          <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
          <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
          <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
          <Route path="/tasks" page={TaskTasksPage} name="tasks" />
        </Set>
        <Set wrap={ProjectsLayout}>
          <Route path="/projects/new" page={ProjectNewProjectPage} name="newProject" />
          <Route path="/projects/{id:Int}/edit" page={ProjectEditProjectPage} name="editProject" />
          <Route path="/projects/{id:Int}" page={ProjectProjectPage} name="project" />
          <Route path="/projects" page={ProjectProjectsPage} name="projects" />
        </Set>
        <Set wrap={OrganisationsLayout}>
          <Route path="/organisations/new" page={OrganisationNewOrganisationPage} name="newOrganisation" />
          <Route path="/organisations/{id:Int}/edit" page={OrganisationEditOrganisationPage} name="editOrganisation" />
          <Route path="/organisations/{id:Int}" page={OrganisationOrganisationPage} name="organisation" />
          <Route path="/organisations" page={OrganisationOrganisationsPage} name="organisations" />
        </Set>
        <Set wrap={UsersLayout}>
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
      </Private>
      <Set wrap={PageHeaderLayout} >
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/home" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes


/*
TO DO :
- Separate view into cells ( view organisation, view project, view task, view message)
- Add further routing to home ( login, register)
- Group routes based on authentication need
- Add query logic to group elements by logged-in user
- TBC
*/