import '../../Home.css';
import { useRef, useState } from 'react';
import { useOnClickInside } from '../../../../common/hooks/useOnClickInside';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { classNames } from '../../../../common/utils/classnames';

const MobilePublicHome = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const contentRef = useRef(null);
  useOnClickInside(contentRef, () => {
    sidebarOpen && setSidebarOpen(false);
  });

  const [activeTab, setActiveTab] = useState(1);
  // const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <div ref={contentRef} className='flex flex-col items-center w-full'>
      <div className='w-10/12 mt-5 bg-white border rounded shadow-md'>
        {/* Tab selection */}
        <div id='tab-select' className='flex w-full text-center'>
          <div
            className={classNames(activeTab === 1 ? 'active-tab' : 'tab')}
            onClick={() => setActiveTab(1)}
          >
            Σύνδεση
          </div>
          <div
            className={classNames(activeTab === 2 ? 'active-tab' : 'tab')}
            onClick={() => setActiveTab(2)}
          >
            Εγγραφή
          </div>
        </div>
        {activeTab === 1 && <LoginForm />}
        {activeTab === 2 && <RegisterForm />}
      </div>
    </div>
  );
};

export default MobilePublicHome;
