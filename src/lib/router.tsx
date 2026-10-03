import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string, withTransition?: boolean) => void;
  isTransitioning: boolean;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  isTransitioning: false,
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, withTransition = true) => {
    const targetPath = to.split('?')[0];
    const currentFull = window.location.pathname + window.location.search;
    if (currentFull === to) return;

    if (withTransition) {
      setIsTransitioning(true);
      setTimeout(() => {
        window.history.pushState({}, '', to);
        setPath(targetPath);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
          setIsTransitioning(false);
        }, 350);
      }, 250);
    } else {
      window.history.pushState({}, '', to);
      setPath(targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate, isTransitioning }}>
      {children}
      {/* Short dark overlay with subtle pink light sweep transition */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-300 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#0E1012]/95 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-64 h-1 bg-[#171A1D] rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF2A85] to-transparent animate-pulse" />
          </div>
          <span className="absolute mt-10 font-mono text-[10px] tracking-widest text-[#FF2A85] uppercase">
            // ACCESSING CLASSIFIED ARCHIVE //
          </span>
        </div>
      </div>
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
