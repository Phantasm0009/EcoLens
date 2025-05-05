import React, { useState, useEffect, useContext } from 'react';
import Camera from '../components/Camera';
import ClassificationResult from '../components/ClassificationResult';
import { loadModel, classifyWaste } from '../services/modelService';
import { logWaste } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaCameraRetro, FaRedo, FaLeaf, FaInfoCircle } from 'react-icons/fa';

const Scan = () => {
    const [image, setImage] = useState(null);
    const [classification, setClassification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modelLoading, setModelLoading] = useState(true);
    const [modelLoadProgress, setModelLoadProgress] = useState(0);
    const { user } = useContext(AuthContext);

    // Load model on component mount
    useEffect(() => {
        const initModel = async () => {
            try {
                // Simulating progress for better UX
                const interval = setInterval(() => {
                    setModelLoadProgress(prev => {
                        const newProgress = prev + Math.random() * 15;
                        return newProgress > 90 ? 90 : newProgress;
                    });
                }, 300);

                await loadModel();
                clearInterval(interval);
                setModelLoadProgress(100);
                
                setTimeout(() => {
                    setModelLoading(false);
                }, 500); // Small delay for smooth transition
            } catch (error) {
                console.error('Error loading model:', error);
                setModelLoadProgress(0);
            }
        };
        
        initModel();
    }, []);

    const handleScan = async (scannedImage) => {
        setImage(scannedImage);
        setLoading(true);
        
        try {
            const result = await classifyWaste(scannedImage);
            setClassification(result);
            
            // Log waste if user is logged in
            if (user && user._id) {
                await logWaste({
                    imageUrl: scannedImage,
                    itemType: result.category,
                    userId: user._id
                });
            }
        } catch (error) {
            console.error('Error during classification:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setImage(null);
        setClassification(null);
    };

    return (
        <div className="page-container scan-page">
            <div className="page-header">
                <h1><FaCameraRetro className="header-icon" /> Waste Scanner</h1>
                <p className="subtitle">Point your camera at waste items to identify and get recycling guidance</p>
            </div>
            
            <div className="scan-content">
                {modelLoading ? (
                    <div className="model-loading">
                        <div className="leaf-loader">
                            <FaLeaf className="leaf-icon spinning" />
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-bar-fill" 
                                style={{ width: `${modelLoadProgress}%` }}
                            ></div>
                        </div>
                        <p className="loading-text">Loading AI model... {Math.round(modelLoadProgress)}%</p>
                        <p className="loading-hint">This may take a moment depending on your connection</p>
                    </div>
                ) : (
                    <>
                        {!classification ? (
                            <div className="camera-container">
                                <Camera onScan={handleScan} />
                                {loading && (
                                    <div className="loading-overlay">
                                        <div className="pulse-loader"></div>
                                        <p>Analyzing waste...</p>
                                    </div>
                                )}
                                <div className="camera-instructions">
                                    <div className="instruction-item">
                                        <FaInfoCircle className="instruction-icon" />
                                        <p>Center the item in frame</p>
                                    </div>
                                    <div className="instruction-item">
                                        <FaInfoCircle className="instruction-icon" />
                                        <p>Ensure good lighting</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="result-container">
                                <div className="result-header">
                                    <h2>Classification Result</h2>
                                </div>
                                <div className="result-content">
                                    <div className="scanned-image">
                                        <img src={image} alt="Scanned waste" />
                                    </div>
                                    <ClassificationResult result={classification} />
                                </div>
                                <div className="result-actions">
                                    <button onClick={handleReset} className="btn btn-primary">
                                        <FaRedo /> Scan Another Item
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Scan;