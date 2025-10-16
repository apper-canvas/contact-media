import { cn } from "@/utils/cn";
import { generateAvatar } from "@/utils/formatters";

const Avatar = ({ name, size = "md", className }) => {
  const { initials, backgroundColor } = generateAvatar(name);
  
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return (
    <div 
      className={cn(
        "avatar-initials flex-shrink-0 rounded-full flex items-center justify-center font-bold text-white",
        sizes[size],
        className
      )}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;