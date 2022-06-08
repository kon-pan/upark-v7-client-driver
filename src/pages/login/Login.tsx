import AuthLayout from '../../common/components/layout/auth/AuthLayout';
import { useDocTitle } from '../../common/hooks/useDocTitle';
import LoginForm from './LoginForm';

const Login = () => {
  const [,] = useDocTitle('uPark | Είσοδος');

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
