import { useAuth } from '@redwoodjs/auth';
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { usePageLoadingContext } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const USERS_QUERY = gql`
query FindUsers {
  users {
    id
    username
    email
    fName
    lName
    hashedPassword
    salt
    resetToken
    resetTokenExpiresAt
  }
}
`



const OrganisationFormAddUser = (props) => {

  const queryUsers = useQuery(
    USERS_QUERY,
    {
      onCompleted: () => {
        toast.success('Users fetched')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const onSubmit = (data) => {
    console.log(data);

    for(let user of data.user_id){
      let dataObj = {}
      dataObj.organisation_id = props.organisation.id
      dataObj.user_id = parseInt(user)
      props.onSave(dataObj, props?.organisation?.id)
    }
    return;
  }

  let isOwnerForm = useAuth().currentUser.id==props.organisation.owner_id?(<>

  </>):(<></>);

  return isOwnerForm
}

export default OrganisationFormAddUser
