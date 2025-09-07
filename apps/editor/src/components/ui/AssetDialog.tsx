import React, { useState, useRef, useEffect } from "react";
import { X, Image as ImageIcon, Video, Music, FileText, FileJson, Play, Pause } from "lucide-react";
import { useSceneStore } from "../../stores/sceneStore";
import { AssetType, Asset } from "../../types/scene";

interface AssetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (assetUrl: string) => void;
    assetType: AssetType;
    title: string;
}

const AssetDialog: React.FC<AssetDialogProps> = ({ isOpen, onClose, onSelect, assetType, title }) => {
    const { getAssetsByType } = useSceneStore();
    const assets = getAssetsByType(assetType);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Reset audio state when selected asset changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    }, [selectedAsset]);

    if (!isOpen) return null;

    const handleAssetSelect = (assetUrl: string) => {
        onSelect(assetUrl);
        setIsPlaying(false);
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    const handleAudioError = () => {
        setIsPlaying(false);
    };

    const getAssetIcon = (type: AssetType) => {
        switch (type) {
            case AssetType.Image:
                return <ImageIcon className="w-5 h-5" />;
            case AssetType.Video:
                return <Video className="w-5 h-5" />;
            case AssetType.Audio:
                return <Music className="w-5 h-5" />;
            case AssetType.Font:
                return <FileText className="w-5 h-5" />;
            case AssetType.Json:
                return <FileJson className="w-5 h-5" />;
            default:
                return <FileText className="w-5 h-5" />;
        }
    };

    const renderPreview = (asset: Asset) => {
        switch (asset.type) {
            case AssetType.Image:
                return (
                    <div className="flex items-center justify-center h-full">
                        <img
                            src={asset.url}
                            alt={asset.name}
                            className="max-w-full max-h-full object-contain rounded border border-border-primary"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove("hidden");
                            }}
                        />
                        <div className="hidden text-center text-text-secondary">
                            <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                            <p>Could not load image</p>
                        </div>
                    </div>
                );
            case AssetType.Video:
                return (
                    <div className="flex items-center justify-center h-full">
                        <video
                            src={asset.url}
                            className="max-w-full max-h-full object-contain rounded border border-border-primary"
                            controls
                            onError={(e) => {
                                const target = e.target as HTMLVideoElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove("hidden");
                            }}
                        />
                        <div className="hidden text-center text-text-secondary">
                            <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
                            <p>Could not load video</p>
                        </div>
                    </div>
                );
            case AssetType.Audio:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <Music className="w-16 h-16 mx-auto mb-4 text-text-secondary opacity-50" />
                            <div className="mb-4">
                                <button
                                    onClick={handlePlayPause}
                                    className="flex items-center justify-center w-16 h-16 mx-auto bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                                </button>
                            </div>
                            <audio
                                ref={audioRef}
                                src={asset.url}
                                onEnded={handleAudioEnded}
                                onError={handleAudioError}
                                className="hidden"
                            />
                            <p className="text-sm text-text-secondary">{asset.name}</p>
                        </div>
                    </div>
                );
            case AssetType.Font:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div
                                className="text-4xl font-bold text-text-primary mb-4"
                                style={{ fontFamily: `"${asset.name}", sans-serif` }}
                            >
                                Hello World!
                            </div>
                            <p className="text-sm text-text-secondary">Font: {asset.name}</p>
                        </div>
                    </div>
                );
            case AssetType.Json:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-text-secondary">
                            <FileJson className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>No preview available</p>
                            <p className="text-xs mt-2">JSON File</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-text-secondary">
                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>No preview available</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-surface-primary dark:bg-surface-secondary border border-border-primary rounded-lg shadow-lg w-[600px] h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-primary">
                    <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-surface-tertiary rounded transition-colors text-text-secondary hover:text-text-primary"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Assets List */}
                    <div className="w-1/2 border-r border-border-primary flex flex-col">
                        <div className="p-3 border-b border-border-primary">
                            <h3 className="text-sm font-medium text-text-primary">Assets ({assets.length})</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {assets.length === 0 ? (
                                <div className="text-center py-8 text-text-secondary">
                                    {getAssetIcon(assetType)}
                                    <p className="mt-2">No {assetType} assets available</p>
                                </div>
                            ) : (
                                <div className="p-2 space-y-1">
                                    {assets.map((asset) => (
                                        <button
                                            key={asset.id}
                                            onClick={() => setSelectedAsset(asset)}
                                            className={`w-full flex items-center space-x-3 p-3 rounded transition-colors text-left ${
                                                selectedAsset?.id === asset.id
                                                    ? "bg-primary-100 dark:bg-primary-900 border border-primary-300 dark:border-primary-700"
                                                    : "hover:bg-surface-tertiary border border-transparent"
                                            }`}
                                        >
                                            <div className="flex-shrink-0 text-text-secondary">
                                                {getAssetIcon(asset.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-text-primary truncate">
                                                    {asset.name}
                                                </p>
                                                <p className="text-xs text-text-secondary truncate">{asset.url}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="w-1/2 flex flex-col">
                        <div className="p-3 border-b border-border-primary">
                            <h3 className="text-sm font-medium text-text-primary">Preview</h3>
                        </div>
                        <div className="flex-1 p-4">
                            {selectedAsset ? (
                                <div className="h-full">{renderPreview(selectedAsset)}</div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary">
                                    <div className="text-center">
                                        {getAssetIcon(assetType)}
                                        <p className="mt-2">Select an asset to see preview</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border-primary flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-sm bg-surface-secondary dark:bg-surface-tertiary border border-border-primary rounded hover:bg-surface-tertiary dark:hover:bg-surface-quaternary transition-colors text-text-primary"
                    >
                        Cancel
                    </button>
                    {selectedAsset && (
                        <button
                            onClick={() => handleAssetSelect(selectedAsset.url)}
                            className="flex-1 px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
                        >
                            Select
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssetDialog;
