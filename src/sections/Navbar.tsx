import React from 'react';
import { useRouter } from '../lib/router';
import LumaBar from '../components/ui/futuristic-nav';

export const Navbar: React.FC = () => {
  const { path, navigate } = useRouter();

  const handleBrandClick = (e: React.MouseEvent) => {
    if (path === '/partners') {
      e.preventDefault();
      navigate('/', true);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-[#0e0c16]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <a
          href="#"
          onClick={handleBrandClick}
          className="flex items-center gap-2.5 leading-none group cursor-pointer shrink-0"
        >
          <span className="text-base sm:text-lg font-black tracking-wider text-white font-marker uppercase">
            HACK <span className="text-[#E5A06F]">FOR GOOD</span>
          </span>
        </a>

        {/* Center: Futuristic Top Nav Bar */}
        <div className="flex items-center justify-center">
          <LumaBar />
        </div>

        {/* Right: Register Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={path === '/partners' ? '/#cta' : '#cta'}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#111315] bg-[#D97745] hover:bg-[#E5A06F] active:bg-[#c66838] rounded-md transition-all shadow-[0_0_12px_rgba(217,119,69,0.3)] hover:shadow-[0_0_18px_rgba(229,160,111,0.45)] select-none"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
