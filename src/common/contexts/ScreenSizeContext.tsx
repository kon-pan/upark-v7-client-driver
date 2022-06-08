import { createContext, useEffect, useState } from 'react';

type ScreenSizeContextType = {
  isMobile: boolean;
  isTablet: boolean;
  isSmall: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
};

export const ScreenSizeContext = createContext<ScreenSizeContextType>({
  isMobile: window.innerWidth <= 480,
  isTablet: window.innerWidth > 480 && window.innerWidth <= 768,
  isSmall: window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: window.innerWidth > 1024 && window.innerWidth <= 1200,
  isLargeDesktop: window.innerWidth > 1200,
});

const ScreenSizeContextProvider = ({ children }: any) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 481 && window.innerWidth <= 1024
  );
  const [isSmall, setIsSmall] = useState(
    window.innerWidth >= 769 && window.innerWidth <= 1024
  );
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1025 && window.innerWidth <= 1200
  );
  const [isLargeDesktop, setIsLargeDesktop] = useState(
    window.innerWidth >= 1201
  );

  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth > 480 && window.innerWidth <= 1024);
      setIsSmall(window.innerWidth > 768 && window.innerWidth <= 1024);
      setIsDesktop(window.innerWidth > 1024 && window.innerWidth <= 1280);
      setIsLargeDesktop(window.innerWidth > 1280);
    };

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <ScreenSizeContext.Provider
      value={{ isMobile, isTablet, isSmall, isDesktop, isLargeDesktop }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};

export default ScreenSizeContextProvider;
