import { useState } from "react";
import AssetDialog from "../../ui/AssetDialog";
import { AssetType } from "../../../types/scene";

interface JsonFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
}

const JsonField = ({ propertyName, value, onUpdate, defaultValue }: JsonFieldProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const jsonValue = (value as string) ?? defaultValue ?? "";

    const handleBrowseClick = () => {
        setIsDialogOpen(true);
    };

    const handleAssetSelect = (assetUrl: string) => {
        onUpdate(assetUrl);
    };

    return (
        <>
            <div className="component-property">
                <span className="property-name">{propertyName}:</span>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={jsonValue}
                        onChange={(e) => onUpdate(e.target.value)}
                        className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                        placeholder="assets/data/example.json"
                        disabled
                    />
                    <button
                        onClick={handleBrowseClick}
                        className="px-2 py-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded hover:bg-surface-tertiary transition-colors"
                        title="Browse JSON file"
                    >
                        Browse
                    </button>
                </div>
            </div>

            <AssetDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSelect={handleAssetSelect}
                assetType={AssetType.Json}
                title="Select JSON"
            />
        </>
    );
};

export default JsonField;
