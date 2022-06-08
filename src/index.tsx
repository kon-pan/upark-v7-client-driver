import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScreenSizeContextProvider from './common/contexts/ScreenSizeContext';
import { AuthContextProvider } from './common/contexts/AuthContext';

ReactDOM.render(
  <AuthContextProvider>
    <ScreenSizeContextProvider>
      <App />
    </ScreenSizeContextProvider>
  </AuthContextProvider>,

  document.getElementById('root')
);
