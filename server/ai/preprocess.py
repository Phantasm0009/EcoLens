import cv2
import numpy as np

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (224, 224))  # Resize to match model input
    image = image / 255.0  # Normalize to [0, 1]
    return image

def preprocess_batch(images):
    processed_images = []
    for image_path in images:
        processed_image = preprocess_image(image_path)
        processed_images.append(processed_image)
    return np.array(processed_images)