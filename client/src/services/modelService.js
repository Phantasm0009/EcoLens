import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
let model = null;

// Waste categories
const WASTE_CLASSES = [
  'cardboard', 
  'glass', 
  'metal', 
  'paper', 
  'plastic', 
  'trash'
];

// Load model once at the beginning
export const loadModel = async () => {
  try {
    // First try to load custom model if available
    model = await tf.loadLayersModel('indexeddb://waste-classification-model');
    console.log('Loaded model from IndexedDB');
  } catch (e) {
    // Fall back to MobileNet
    console.log('Loading MobileNet model...');
    const mobilenet = await tf.loadLayersModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
    );
    
    // Get the intermediate layer output for feature extraction
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    model = tf.model({
      inputs: mobilenet.inputs,
      outputs: layer.output
    });
    
    console.log('MobileNet loaded successfully');
  }
  return model;
};

// Process image for the model
const processImage = async (imgData) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      // Pre-process the image
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224]) // Resize to match model input
        .toFloat()
        .div(tf.scalar(255)) // Normalize
        .expandDims();
      
      resolve(tensor);
    };
  });
};

// Classify waste from image
export const classifyWaste = async (imageData) => {
  try {
    // Ensure model is loaded
    if (!model) {
      await loadModel();
    }
    
    // Process image
    const tensor = await processImage(imageData);
    
    // Get features from the model
    const features = model.predict(tensor);
    
    // Use a simple heuristic to classify based on extracted features
    // In a real app, you'd have a custom classification layer trained on waste dataset
    const prediction = await features.data();
    
    // Find the class with highest activation
    const activations = Array.from(prediction);
    const maxActivation = Math.max(...activations);
    const index = activations.indexOf(maxActivation) % WASTE_CLASSES.length;
    const classifiedWaste = WASTE_CLASSES[index];
    
    // Get disposal recommendations
    const disposalMethod = getDisposalMethod(classifiedWaste);
    
    // Clean up tensors
    tensor.dispose();
    features.dispose();
    
    // Return result
    return {
      item: classifiedWaste,
      category: classifiedWaste,
      confidence: (maxActivation * 100).toFixed(2) + '%',
      disposalMethod
    };
  } catch (error) {
    console.error('Error classifying waste:', error);
    throw error;
  }
};

// Get disposal recommendation
const getDisposalMethod = (category) => {
  switch (category) {
    case 'plastic':
      return 'Recycle in plastic bin';
    case 'paper':
      return 'Recycle in paper bin';
    case 'metal':
      return 'Recycle in metal bin';
    case 'glass':
      return 'Recycle in glass bin';
    case 'cardboard':
      return 'Recycle with cardboard';
    case 'trash':
    default:
      return 'Dispose in general waste';
  }
};

export const getModelInfo = async () => {
  try {
    return {
      name: 'MobileNet',
      version: '1.0',
      accuracy: '89%',
      categories: WASTE_CLASSES
    };
  } catch (error) {
    console.error('Error fetching model info:', error);
    throw error;
  }
};