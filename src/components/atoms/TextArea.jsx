import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const TextArea = forwardRef(({ 
  className, 
  error,
  rows = 4,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan resize-vertical";
  const errorStyles = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";

  return (
    <textarea
      rows={rows}
      className={cn(baseStyles, errorStyles, className)}
      ref={ref}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;