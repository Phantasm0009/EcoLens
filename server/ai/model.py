from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping
import os

class WasteClassificationModel:
    def __init__(self, input_shape=(224, 224, 3), num_classes=5):
        self.model = self.build_model(input_shape, num_classes)

    def build_model(self, input_shape, num_classes):
        model = Sequential()
        model.add(Conv2D(32, (3, 3), activation='relu', input_shape=input_shape))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Conv2D(64, (3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Conv2D(128, (3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Flatten())
        model.add(Dense(128, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(num_classes, activation='softmax'))
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        return model

    def train(self, train_data_dir, validation_data_dir, epochs=50, batch_size=32):
        train_datagen = ImageDataGenerator(rescale=1.0/255.0)
        validation_datagen = ImageDataGenerator(rescale=1.0/255.0)

        train_generator = train_datagen.flow_from_directory(
            train_data_dir,
            target_size=(224, 224),
            batch_size=batch_size,
            class_mode='categorical'
        )

        validation_generator = validation_datagen.flow_from_directory(
            validation_data_dir,
            target_size=(224, 224),
            batch_size=batch_size,
            class_mode='categorical'
        )

        early_stopping = EarlyStopping(monitor='val_loss', patience=5)

        self.model.fit(
            train_generator,
            steps_per_epoch=train_generator.samples // batch_size,
            validation_data=validation_generator,
            validation_steps=validation_generator.samples // batch_size,
            epochs=epochs,
            callbacks=[early_stopping]
        )

    def save_model(self, model_path):
        self.model.save(model_path)

    def load_model(self, model_path):
        from tensorflow.keras.models import load_model
        self.model = load_model(model_path)