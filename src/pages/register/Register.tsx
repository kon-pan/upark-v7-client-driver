import AuthLayout from '../../common/components/layout/auth/AuthLayout';
import { useDocTitle } from '../../common/hooks/useDocTitle';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [,] = useDocTitle('uPark | Εγγραφή');

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
