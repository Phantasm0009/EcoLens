import React from 'react';
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaGavel, FaBalanceScale } from 'react-icons/fa';

const Terms = () => {
    return (
        <div className="page-container terms-page">
            <div className="page-header">
                <h1><FaFileContract className="header-icon" /> Terms of Service</h1>
                <p className="subtitle">Last Updated: May 1, 2025</p>
            </div>
            
            <div className="content-container">
                <section className="terms-section">
                    <h2><FaUserCheck className="section-icon" /> User Agreement</h2>
                    <p>Welcome to EcoLens. By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.</p>
                    
                    <div className="terms-item">
                        <h3>Acceptance of Terms</h3>
                        <p>By creating an account or using any part of the EcoLens application, you agree to comply with and be bound by these Terms of Service. These Terms govern your relationship with EcoLens and your use of the application.</p>
                    </div>
                    
                    <div className="terms-item">
                        <h3>Changes to Terms</h3>
                        <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting an updated version on our website or within the app. Your continued use of EcoLens after changes constitutes acceptance of those changes.</p>
                    </div>
                </section>
                
                <section className="terms-section">
                    <h2>Account Registration and Security</h2>
                    <p>To use certain features of EcoLens, you must create an account:</p>
                    <ul className="terms-list">
                        <li>You are responsible for maintaining the confidentiality of your account and password</li>
                        <li>You agree to accept responsibility for all activities that occur under your account</li>
                        <li>You must provide accurate, current, and complete information during registration</li>
                        <li>You may not use false identities or impersonate any person</li>
                        <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
                    </ul>
                </section>
                
                <section className="terms-section">
                    <h2>User Content and Conduct</h2>
                    <p>When using EcoLens, you agree not to:</p>
                    <ul className="terms-list">
                        <li>Upload content that is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
                        <li>Impersonate any person or entity or falsely state your affiliation</li>
                        <li>Upload content that infringes upon intellectual property rights</li>
                        <li>Use the service for any illegal purpose or in violation of any local laws</li>
                        <li>Interfere with or disrupt the service or servers</li>
                        <li>Attempt to gain unauthorized access to any part of the service</li>
                    </ul>
                </section>
                
                <section className="terms-section">
                    <h2><FaBalanceScale className="section-icon" /> Intellectual Property</h2>
                    <p>The EcoLens application, including all content, features, and functionality, is owned by EcoLens and is protected by copyright, trademark, and other intellectual property laws:</p>
                    <ul className="terms-list">
                        <li>You may not modify, reproduce, distribute, or create derivative works based on any content</li>
                        <li>The EcoLens name, logo, and all related names and logos are trademarks of EcoLens</li>
                        <li>By submitting content to EcoLens, you grant us a worldwide, non-exclusive license to use, reproduce, and display that content</li>
                    </ul>
                </section>
                
                <section className="terms-section">
                    <h2><FaExclamationTriangle className="section-icon" /> Disclaimer of Warranties</h2>
                    <p>EcoLens is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:</p>
                    <ul className="terms-list">
                        <li>The service will be uninterrupted or error-free</li>
                        <li>Defects will be corrected</li>
                        <li>The service is free of viruses or other harmful components</li>
                        <li>The accuracy of waste classification results</li>
                    </ul>
                </section>
                
                <section className="terms-section">
                    <h2>Limitation of Liability</h2>
                    <p>In no event shall EcoLens be liable for any indirect, incidental, special, consequential, or punitive damages, arising out of or in connection with your use of the service.</p>
                </section>
                
                <section className="terms-section">
                    <h2><FaGavel className="section-icon" /> Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                </section>
                
                <section className="terms-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <address>
                        <strong>EcoLens Legal Team</strong><br />
                        legal@ecolens.com<br />
                        123 Green Street<br />
                        Eco City, EC 12345
                    </address>
                </section>
            </div>
        </div>
    );
};

export default Terms;