# EcoLens Client Documentation

## Overview
EcoLens is an AI-powered mobile and web application designed to assist users in properly disposing of waste through real-time classification. By leveraging computer vision technology, EcoLens aims to reduce contamination in recycling bins and promote sustainable habits among users in homes, schools, and community centers.

## Features
- **AI Waste Scanner**: Utilize your smartphone or webcam to identify waste items and receive guidance on disposal methods.
- **Impact Tracker**: Monitor your eco-impact, including CO₂ saved and materials recycled, while competing in community rankings.
- **Gamified Rewards**: Earn badges and achievements for consistent recycling efforts.
- **Educational Content**: Access resources to learn more about recycling and waste management.

## Getting Started
To run the EcoLens client application locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ecolens.git
   cd ecolens/client
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Directory Structure
- **public/**: Contains static files such as `index.html` and `manifest.json`.
- **src/**: The main source code for the application.
  - **assets/**: Static assets like images and stylesheets.
  - **components/**: Reusable components for the application.
  - **pages/**: Different pages of the application.
  - **context/**: Context API for managing authentication state.
  - **services/**: API and model service functions.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or feedback, please reach out to [your-email@example.com].
