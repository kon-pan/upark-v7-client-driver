import axios, { AxiosResponse } from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IDriver } from '../interfaces/interfaces';

type AuthContextType = {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  driver?: IDriver;
  loading: boolean;
  // error?: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<{ success: boolean; err?: any }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [driver, setDriver] = useState<IDriver>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUser = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/auth/get`,
          {
            cancelToken: source.token,
            withCredentials: true,
          }
        );

        if (response.data) {
          setDriver({
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            displayName: response.data.display_name,
            email: response.data.email,
            accumulatedTime: response.data.accumulated_time,
            registeredOn: response.data.registered_on,
            registeredWith: response.data.registered_with,
            role: response.data.role,
          });
        }

        setLoadingInitial(false);
      } catch (error) {
        throw error;
      }
    };

    fetchUser();

    return () => {
      source.cancel();
    };
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<{ success: boolean; err?: any }> => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/register`,
        { firstName, lastName, email, password, passwordConfirm }
      );
      if (!response.data.success) {
        setLoading(false);
        return response.data;
      } else {
        setLoading(false);
        return { success: true };
      }
    } catch (error) {
      setLoading(false);
      console.log(error);

      return { success: false };
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        // window.location.href = '/';
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      driver,
      loading,
      login,
      register,
      logout,
    }),
    [driver, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

// Only export the `useAuth` hook instead of the context.
// Use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
