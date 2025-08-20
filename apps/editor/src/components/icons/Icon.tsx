import { LucideIcon, LucideProps } from "lucide-react";
import { forwardRef } from "react";

interface IconProps extends Omit<LucideProps, "ref"> {
    icon: LucideIcon;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
    className?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ icon: IconComponent, size = "md", variant = "default", className = "", ...props }, ref) => {
        const sizeClasses = {
            xs: "w-3 h-3",
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
            xl: "w-8 h-8",
            "2xl": "w-10 h-10",
        };

        const variantClasses = {
            default: "text-text-primary",
            primary: "text-primary-600",
            secondary: "text-text-secondary",
            success: "text-accent-success",
            warning: "text-accent-warning",
            error: "text-accent-error",
        };

        const baseClasses = "transition-colors duration-200";
        const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

        return <IconComponent ref={ref} className={combinedClasses} {...props} />;
    },
);

Icon.displayName = "Icon";

export default Icon;
