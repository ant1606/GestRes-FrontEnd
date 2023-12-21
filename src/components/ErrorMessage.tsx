import React from 'react';

interface ErrorMessageProps {
  error: string | null | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      <span className="text-xs absolute -bottom-5 z-10 text-red-500 font-bold ">{error}</span>
    </>
  );
};

export default ErrorMessage;
