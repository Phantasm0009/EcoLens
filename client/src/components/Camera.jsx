import React, { useRef, useEffect, useState } from 'react';
import { FaCamera, FaExclamationTriangle } from 'react-icons/fa';

const Camera = ({ onScan }) => {
    const videoRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: "environment" }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsCameraActive(true);
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
                setCameraError(
                    error.name === 'NotAllowedError' 
                    ? 'Camera access denied. Please allow camera access to use this feature.' 
                    : 'Unable to access camera. Please check your device settings.'
                );
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleScan = () => {
        if (!videoRef.current) return;
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        onScan(imageData);
    };

    return (
        <div className="camera-wrapper">
            {cameraError ? (
                <div className="camera-error">
                    <FaExclamationTriangle size={40} />
                    <p>{cameraError}</p>
                </div>
            ) : (
                <>
                    <div className="camera-frame">
                        <video ref={videoRef} autoPlay playsInline />
                        <div className="camera-overlay">
                            <div className="scanning-lines"></div>
                        </div>
                    </div>
                    {isCameraActive && (
                        <button 
                            className="capture-button" 
                            onClick={handleScan}
                            aria-label="Capture image"
                        >
                            <FaCamera />
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Camera;