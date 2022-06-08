import { Link } from 'react-router-dom';
import { classNames } from '../../../utils/classnames';

const AuthLayout = ({ children }: any) => {
  return (
    <div
      className={classNames(
        'min-h-screen',
        'flex flex-col items-center',
        'bg-neutral-800 text-neutral-50'
      )}
    >
      <Link to='/' className='flex items-center justify-center py-6'>
        <div id='navbar-logo'>
          u<span className='font-bold text-yellow-300'>Park</span>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
