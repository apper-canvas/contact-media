import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  error,
  children,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 bg-white border rounded-lg text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan";
  const errorStyles = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";

  return (
    <select
      className={cn(baseStyles, errorStyles, className)}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;