import { ReactNode } from "react";

interface ContainerWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContainerWrapper = ({ children, className }: ContainerWrapperProps) => {
  return (
    <div className={`${className} container mx-auto px-5`}>{children}</div>
  );
};

export default ContainerWrapper;
