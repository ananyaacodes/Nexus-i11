import React, { useState } from 'react';

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextType | null>(null);

export const TooltipProvider: React.FC<{
  children: React.ReactNode;
  delayDuration?: number;
}> = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex items-center justify-center">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger: React.FC<{
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  asChild?: boolean;
}> = ({ children }) => {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) return children;

  return React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      ctx.setOpen(true);
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      ctx.setOpen(false);
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      ctx.setOpen(true);
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      ctx.setOpen(false);
      children.props.onBlur?.(e);
    },
  });
};

export const TooltipContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}> = ({ children, className = '', sideOffset = 8 }) => {
  const ctx = React.useContext(TooltipContext);
  if (!ctx || !ctx.open) return null;

  return (
    <div
      className={`absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap bg-[#171A1D]/95 text-[#F1EEE7] text-xs font-semibold px-2.5 py-1 rounded-md border border-[rgba(241,238,231,0.15)] shadow-lg backdrop-blur-md transition-all animate-in fade-in zoom-in-95 duration-150 ${className}`}
      style={{ marginBottom: `${sideOffset}px` }}
    >
      {children}
    </div>
  );
};
