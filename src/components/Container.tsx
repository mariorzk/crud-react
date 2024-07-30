// src/components/Container.tsx
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md">
      {children} 
    </div>
  );
};

export default Container;
