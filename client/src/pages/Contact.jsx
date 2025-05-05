import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };
    
    return (
        <div className="page-container contact-page">
            <div className="page-header">
                <h1><FaEnvelope className="header-icon" /> Contact Us</h1>
                <p className="subtitle">We'd love to hear from you! Reach out with questions, feedback, or partnership inquiries.</p>
            </div>
            
            <div className="contact-content">
                <div className="contact-info-section">
                    <h2>Get In Touch</h2>
                    
                    <div className="contact-methods">
                        <div className="contact-method">
                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>
                            <div className="contact-details">
                                <h3>Email Us</h3>
                                <p>hello@ecolens.com</p>
                                <p>support@ecolens.com (Technical Support)</p>
                            </div>
                        </div>
                        
                        <div className="contact-method">
                            <div className="contact-icon">
                                <FaPhone />
                            </div>
                            <div className="contact-details">
                                <h3>Call Us</h3>
                                <p>(555) 123-4567</p>
                                <p>Monday - Friday: 9am - 5pm EST</p>
                            </div>
                        </div>
                        
                        <div className="contact-method">
                            <div className="contact-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div className="contact-details">
                                <h3>Visit Us</h3>
                                <p>123 Green Street</p>
                                <p>Eco City, EC 12345</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.5032930863833!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1620335645893!5m2!1sen!2sus" 
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="EcoLens Office Location"
                        ></iframe>
                    </div>
                </div>
                
                <div className="contact-form-section">
                    <h2>Send Us a Message</h2>
                    
                    {submitted ? (
                        <div className="success-message">
                            <FaCheckCircle className="success-icon" />
                            <h3>Thank you for your message!</h3>
                            <p>We've received your inquiry and will get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {error && <div className="error-message">{error}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="name">Your Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email Address*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="subject">Subject*</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="message">Message*</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="btn btn-primary submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        <FaPaperPlane /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                    
                    <div className="form-help-text">
                        <p>* Required fields</p>
                        <p>Your information will be handled according to our <a href="/privacy">Privacy Policy</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;