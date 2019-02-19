import { withRouter } from 'react-router-dom';

const Login = (props) => {
    console.log('LOGIN:', props)
    props.auth.login()

}

export default withRouter(Login)


