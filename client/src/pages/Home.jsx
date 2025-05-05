import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { FaRecycle, FaLeaf, FaChartLine, FaMobileAlt } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section">
                <h1>Welcome to EcoLens</h1>
                <p>Your AI-powered assistant for smart recycling! Scan waste items, track your environmental impact, and help build a greener future.</p>
                <Link to="/scan" className="btn">Start Scanning</Link>
            </section>
            
            <section className="features-section">
                <h2>How EcoLens Works</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaMobileAlt />
                        </div>
                        <h3>Scan Items</h3>
                        <p>Point your camera at any waste item and our AI will identify it instantly</p>
                    </div>
                    
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaRecycle />
                        </div>
                        <h3>Get Guidance</h3>
                        <p>Receive specific recycling instructions for that item in your area</p>
                    </div>
                    
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaChartLine />
                        </div>
                        <h3>Track Impact</h3>
                        <p>Monitor your environmental contribution and recycling habits</p>
                    </div>
                    
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaLeaf />
                        </div>
                        <h3>Earn Rewards</h3>
                        <p>Gain badges and points for your positive environmental actions</p>
                    </div>
                </div>
            </section>
            
            <Dashboard />
        </div>
    );
};

export default Home;