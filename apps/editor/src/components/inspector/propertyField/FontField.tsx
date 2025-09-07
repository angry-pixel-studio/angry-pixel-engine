import { useSceneStore } from "../../../stores/sceneStore";

interface FontFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
}

const FontField = ({ propertyName, value, onUpdate, defaultValue }: FontFieldProps) => {
    const fontValue = (value as string) ?? defaultValue ?? "";

    const fontAssets = useSceneStore.getState().getFontAssets();
    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <select
                value={fontValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            >
                <option value="">Select font...</option>
                {fontAssets.map((asset) => (
                    <option key={asset.id} value={asset.name}>
                        {asset.name}
                    </option>
                ))}
                <option value="Arial">Arial</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Book Antiqua">Book Antiqua</option>
                <option value="Brush Script MT">Brush Script MT</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Copperplate">Copperplate</option>
                <option value="Courier New">Courier New</option>
                <option value="Geneva">Geneva</option>
                <option value="Georgia">Georgia</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Impact">Impact</option>
                <option value="Lucida Console">Lucida Console</option>
                <option value="Optima">Optima</option>
                <option value="Papyrus">Papyrus</option>
                <option value="Symbol">Symbol</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Verdana">Verdana</option>
            </select>
        </div>
    );
};

export default FontField;
