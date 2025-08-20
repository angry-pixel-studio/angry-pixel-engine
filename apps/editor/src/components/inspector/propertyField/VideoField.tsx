interface VideoFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const VideoField = ({ propertyName, value, onUpdate }: VideoFieldProps) => {
    const videoValue = (value as string) || "";

    return (
        <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary min-w-[60px]">{propertyName}:</span>
            <input
                type="text"
                value={videoValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                placeholder="assets/video/example.mp4"
            />
            <button
                className="px-2 py-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded hover:bg-surface-tertiary transition-colors"
                title="Browse video file"
            >
                Browse
            </button>
        </div>
    );
};

export default VideoField;
