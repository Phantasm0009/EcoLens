import React from 'react';
import { FaRecycle, FaTrash, FaGlassWhiskey, FaBox, FaFileAlt } from 'react-icons/fa';

const ClassificationResult = ({ result }) => {
    if (!result) return null;

    const getIcon = (category) => {
        switch (category) {
            case 'plastic':
                return <FaRecycle className="category-icon plastic" />;
            case 'glass':
                return <FaGlassWhiskey className="category-icon glass" />;
            case 'metal':
                return <FaRecycle className="category-icon metal" />;
            case 'paper':
                return <FaFileAlt className="category-icon paper" />;
            case 'cardboard':
                return <FaBox className="category-icon cardboard" />;
            case 'trash':
            default:
                return <FaTrash className="category-icon trash" />;
        }
    };

    const getImpactText = (category) => {
        switch (category) {
            case 'plastic':
                return 'Recycling plastic reduces oil consumption and landfill volume.';
            case 'glass':
                return 'Glass is 100% recyclable and can be recycled endlessly without loss of quality.';
            case 'metal':
                return 'Recycling aluminum uses 95% less energy than producing new aluminum.';
            case 'paper':
                return 'Recycling paper saves trees and reduces landfill space.';
            case 'cardboard':
                return 'Recycling one ton of cardboard saves 9 cubic yards of landfill space.';
            case 'trash':
            default:
                return 'Consider if any components can be recycled before disposing as waste.';
        }
    };

    // Extract confidence as a number
    const confidenceValue = parseFloat(result.confidence) || parseFloat(result.confidence.replace('%', '')) || 0;
    const confidencePercent = confidenceValue > 1 ? confidenceValue : confidenceValue * 100;

    return (
        <div className="classification-result">
            <h2>Classification Result</h2>
            <div className="result-card">
                <div className="result-header">
                    {getIcon(result.category)}
                    <h3>{result.category.charAt(0).toUpperCase() + result.category.slice(1)}</h3>
                </div>
                
                <div className="confidence-bar">
                    <div className="confidence-text">Confidence: {confidencePercent.toFixed(1)}%</div>
                    <div className="confidence-meter">
                        <div 
                            className="confidence-level" 
                            style={{ width: `${Math.min(confidencePercent, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="disposal-method">
                    <h4>How to dispose:</h4>
                    <p>{result.disposalMethod}</p>
                </div>

                <div className="environmental-impact">
                    <h4>Environmental Impact:</h4>
                    <p>{getImpactText(result.category)}</p>
                </div>

                <div className="action-buttons">
                    <button className="btn btn-outline">
                        Save to History
                    </button>
                    <button className="btn btn-outline">
                        Share Result
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassificationResult;