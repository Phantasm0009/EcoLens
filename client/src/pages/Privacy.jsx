import React from 'react';
import { FaShieldAlt, FaUserShield, FaLock, FaCookie, FaExchangeAlt } from 'react-icons/fa';

const Privacy = () => {
    return (
        <div className="page-container privacy-page">
            <div className="page-header">
                <h1><FaShieldAlt className="header-icon" /> Privacy Policy</h1>
                <p className="subtitle">Last Updated: May 1, 2025</p>
            </div>
            
            <div className="content-container">
                <section className="policy-section">
                    <h2><FaUserShield className="section-icon" /> Information We Collect</h2>
                    <p>At EcoLens, we take your privacy seriously. This policy describes the types of information we collect and how we use it:</p>
                    
                    <div className="policy-item">
                        <h3>Account Information</h3>
                        <p>When you register for an EcoLens account, we collect your username, email address, and a secure encrypted password. This information is necessary to create and manage your account.</p>
                    </div>
                    
                    <div className="policy-item">
                        <h3>Usage Information</h3>
                        <p>We collect data about how you use our application, including items you scan, recycling habits, and interaction with features. This helps us improve our service and provide personalized recommendations.</p>
                    </div>
                    
                    <div className="policy-item">
                        <h3>Device Information</h3>
                        <p>We collect information about the device you use to access EcoLens, including device type, operating system, and browser. This helps us optimize our application for different devices.</p>
                    </div>
                    
                    <div className="policy-item">
                        <h3>Image Data</h3>
                        <p>When you use our scanning feature, we process images of waste items to provide classification results. These images may be retained to improve our AI model's accuracy, but we do not associate them with personally identifiable information without your consent.</p>
                    </div>
                </section>
                
                <section className="policy-section">
                    <h2><FaLock className="section-icon" /> How We Protect Your Information</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information:</p>
                    <ul className="policy-list">
                        <li>All sensitive data is encrypted using industry-standard techniques</li>
                        <li>Regular security assessments and audits of our systems</li>
                        <li>Limited employee access to personal information</li>
                        <li>Secure data centers with environmental and physical safeguards</li>
                    </ul>
                </section>
                
                <section className="policy-section">
                    <h2><FaExchangeAlt className="section-icon" /> Information Sharing and Disclosure</h2>
                    <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following circumstances:</p>
                    <ul className="policy-list">
                        <li>With trusted third parties who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential</li>
                        <li>When we believe release is appropriate to comply with the law or protect our or others' rights</li>
                        <li>With your consent, such as when you choose to share your recycling achievements</li>
                    </ul>
                </section>
                
                <section className="policy-section">
                    <h2><FaCookie className="section-icon" /> Cookies and Tracking</h2>
                    <p>EcoLens uses cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookies through your browser settings.</p>
                </section>
                
                <section className="policy-section">
                    <h2>Your Privacy Rights</h2>
                    <p>Depending on your location, you may have rights regarding your personal information, including:</p>
                    <ul className="policy-list">
                        <li>Access to your personal data</li>
                        <li>Correction of inaccurate information</li>
                        <li>Deletion of your personal data</li>
                        <li>Restriction or objection to certain processing activities</li>
                        <li>Data portability</li>
                    </ul>
                    <p>To exercise these rights, please contact us at privacy@ecolens.com.</p>
                </section>
                
                <section className="policy-section">
                    <h2>Changes to This Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
                </section>
                
                <section className="policy-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <address>
                        <strong>EcoLens Privacy Team</strong><br />
                        privacy@ecolens.com<br />
                        123 Green Street<br />
                        Eco City, EC 12345
                    </address>
                </section>
            </div>
        </div>
    );
};

export default Privacy;