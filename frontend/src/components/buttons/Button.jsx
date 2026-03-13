import { cn } from "../../utils/cn";

const Button = ({ children = "Button", onClick, className }) => {
  return (
    <button
      className={cn(
        "px-5 bg-neutral-800 text-neutral-200 rounded-lg py-2",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
