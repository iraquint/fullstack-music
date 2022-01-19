import AuthForm from "../components/authForm";
import Signin from "./signin";

const Signup = () => {
  return <AuthForm mode='signup' />
}

Signup.authPage = true;

export default Signup;