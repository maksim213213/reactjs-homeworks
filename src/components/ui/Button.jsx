const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`rounded-xl bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;