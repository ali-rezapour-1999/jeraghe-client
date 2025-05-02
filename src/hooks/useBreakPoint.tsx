import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg";

interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
}

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  currentBreakpoint: Breakpoint;
}

const useBreakpoint = (
  customBreakpoints?: Partial<Breakpoints>
): BreakpointState => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  const [breakpointState, setBreakpointState] = useState<BreakpointState>({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    currentBreakpoint: "sm",
  });

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;

      if (width < breakpoints.md) {
        setBreakpointState({
          isMobile: true,
          isTablet: false,
          isLaptop: false,
          currentBreakpoint: "sm",
        });
      } else if (width >= breakpoints.md && width < breakpoints.lg) {
        setBreakpointState({
          isMobile: false,
          isTablet: true,
          isLaptop: false,
          currentBreakpoint: "md",
        });
      } else {
        setBreakpointState({
          isMobile: false,
          isTablet: false,
          isLaptop: true,
          currentBreakpoint: "lg",
        });
      }
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoints.md, breakpoints.lg]);

  return breakpointState;
};

export default useBreakpoint;
