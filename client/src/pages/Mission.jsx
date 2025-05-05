import React from 'react';
import { FaLeaf, FaRecycle, FaUsers, FaLightbulb, FaBullseye, FaHandshake } from 'react-icons/fa';

const Mission = () => {
    return (
        <div className="page-container mission-page">
            <div className="page-header">
                <h1><FaBullseye className="header-icon" /> Our Mission</h1>
                <p className="subtitle">Building a sustainable future through AI-powered recycling solutions</p>
            </div>
            
            <section className="mission-statement">
                <div className="mission-content">
                    <h2>Our Vision</h2>
                    <p>
                        At EcoLens, we envision a world where waste management is intuitive, accessible, and effortless for everyone. 
                        We believe that by combining cutting-edge AI technology with environmental science, we can create a significant 
                        positive impact on our planet's health and sustainability.
                    </p>
                    
                    <blockquote className="mission-quote">
                        "We're committed to making recycling so easy that it becomes second nature for everyone."
                    </blockquote>
                </div>
            </section>
            
            <section className="values-section">
                <h2>Our Core Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <FaLeaf className="value-icon" />
                        <h3>Environmental Stewardship</h3>
                        <p>We prioritize environmental health in every decision we make, focusing on solutions that have real, measurable impact on waste reduction.</p>
                    </div>
                    
                    <div className="value-card">
                        <FaLightbulb className="value-icon" />
                        <h3>Innovation</h3>
                        <p>We constantly push the boundaries of what's possible with AI and waste identification to create more effective recycling solutions.</p>
                    </div>
                    
                    <div className="value-card">
                        <FaUsers className="value-icon" />
                        <h3>Community</h3>
                        <p>We believe in the power of collective action and creating communities of environmentally-conscious individuals working together.</p>
                    </div>
                    
                    <div className="value-card">
                        <FaHandshake className="value-icon" />
                        <h3>Accessibility</h3>
                        <p>We're committed to making sustainable practices accessible to everyone, regardless of background or prior knowledge.</p>
                    </div>
                </div>
            </section>
            
            <section className="impact-section">
                <h2>Our Impact Goals</h2>
                <div className="impact-cards">
                    <div className="impact-card">
                        <div className="impact-number">1M+</div>
                        <p>Users educated about proper recycling by 2026</p>
                    </div>
                    
                    <div className="impact-card">
                        <div className="impact-number">100K</div>
                        <p>Tons of waste properly sorted and diverted from landfills</p>
                    </div>
                    
                    <div className="impact-card">
                        <div className="impact-number">50%</div>
                        <p>Reduction in recycling contamination among our users</p>
                    </div>
                </div>
            </section>
            
            <section className="team-section">
                <h2>Our Team</h2>
                <p className="team-intro">
                    EcoLens was founded by a diverse team of environmental scientists, AI specialists, and passionate 
                    sustainability advocates who share a common goal of making recycling easier and more effective for everyone.
                </p>
                
                <div className="join-us">
                    <h3>Join Our Mission</h3>
                    <p>
                        We're always looking for passionate individuals to join our team, whether as employees, 
                        partners, or community advocates. If you share our vision for a cleaner, more sustainable 
                        future, we'd love to hear from you.
                    </p>
                    <a href="/contact" className="btn btn-primary">Get Involved</a>
                </div>
            </section>
        </div>
    );
};

export default Mission;