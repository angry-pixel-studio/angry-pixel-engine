import { useState, ReactNode } from "react";

export interface Tab {
    id: string;
    label: string;
    icon?: string | React.ComponentType<any>;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    className?: string;
    onTabChange?: (tabId: string) => void;
    variant?: "default" | "compact" | "pills";
    size?: "sm" | "md" | "lg";
}

const Tabs = ({ tabs, defaultTab, className = "", onTabChange, variant = "default", size = "md" }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    const getTabButtonClasses = (isActive: boolean) => {
        const baseClasses =
            "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none active:outline-none";

        const sizeClasses = {
            sm: "px-3 py-2 text-xs",
            md: "px-4 py-3 text-sm",
            lg: "px-5 py-4 text-base",
        };

        const variantClasses = {
            default: isActive
                ? "bg-surface-primary text-text-primary rounded-t-lg border-l border-r border-t border-border-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-t-lg",
            compact: isActive
                ? "bg-surface-primary text-text-primary rounded-t-md border-l border-r border-t border-border-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-t-md",
            pills: isActive
                ? "bg-primary-600 text-text-inverse rounded-full shadow-soft"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-full",
        };

        return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
    };

    const getTabsContainerClasses = () => {
        const baseClasses = "flex";

        const variantClasses = {
            default: "px-2 pt-1 bg-background-tertiary overflow-hidden",
            compact: "px-2 pt-1 bg-background-tertiary overflow-hidden",
            pills: "space-x-2 p-1 bg-background-tertiary rounded-lg overflow-hidden",
        };

        return `${baseClasses} ${variantClasses[variant]}`;
    };

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    return (
        <div className={`flex flex-col h-full w-full ${className}`}>
            {/* Tab Headers */}
            <div className={`${getTabsContainerClasses()} min-w-0`}>
                <div className="flex space-x-1 min-w-0 overflow-x-auto scrollbar-hide tabs-scroll w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`${getTabButtonClasses(activeTab === tab.id)} min-w-0 flex-shrink-0 whitespace-nowrap`}
                            type="button"
                        >
                            {tab.icon &&
                                (typeof tab.icon === "string" ? (
                                    <span className="text-lg flex-shrink-0">{tab.icon}</span>
                                ) : (
                                    <tab.icon className="w-5 h-5" />
                                ))}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden bg-surface-primary min-w-0 -mt-px">{activeTabContent}</div>
        </div>
    );
};

export default Tabs;
