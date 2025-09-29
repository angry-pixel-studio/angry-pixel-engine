import { AlertTriangle, X } from "lucide-react";
import Icon from "./Icon";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
}

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
}: ConfirmationDialogProps) => {
    if (!isOpen) return null;

    const getVariantStyles = () => {
        switch (variant) {
            case "danger":
                return {
                    iconColor: "text-accent-error",
                    confirmButton: "bg-accent-error hover:bg-accent-error/90 text-white",
                };
            case "warning":
                return {
                    iconColor: "text-accent-warning",
                    confirmButton: "bg-accent-warning hover:bg-accent-warning/90 text-white",
                };
            case "info":
                return {
                    iconColor: "text-accent-info",
                    confirmButton: "bg-accent-info hover:bg-accent-info/90 text-white",
                };
            default:
                return {
                    iconColor: "text-accent-error",
                    confirmButton: "bg-accent-error hover:bg-accent-error/90 text-white",
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Dialog */}
            <div className="relative bg-surface-primary border border-border-primary rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-primary">
                    <div className="flex items-center space-x-3">
                        <Icon icon={AlertTriangle} size="sm" className={styles.iconColor} />
                        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-text-tertiary hover:text-text-primary hover:bg-surface-secondary rounded transition-colors"
                        title="Close"
                    >
                        <Icon icon={X} size="sm" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-text-secondary leading-relaxed">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 p-4 border-t border-border-primary">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${styles.confirmButton}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
