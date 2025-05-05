import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ImpactTracker from './ImpactTracker';
import Leaderboard from './Leaderboard';
import Rewards from './Rewards';
import WasteDistributionChart from './WasteDistributionChart';
import { getUserWasteLogs } from '../services/api';
import { FaRecycle, FaLeaf, FaTrophy } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        rewards: [],
        rankings: [],
        wasteDistribution: [
            { category: 'Plastic', count: 1 },
            { category: 'Paper', count: 1 },
            { category: 'Glass', count: 1 },
            { category: 'Metal', count: 1 },
            { category: 'Cardboard', count: 1 },
            { category: 'Trash', count: 1 }
        ]
    });
    const [loading, setLoading] = useState(false);

    // Fetch actual user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user._id) {
                setLoading(true);
                try {
                    // Get user's waste logs
                    const logs = await getUserWasteLogs(user._id);
                    
                    // Process logs to create waste distribution data
                    const distribution = processWasteLogs(logs);
                    
                    setUserData(prevData => ({
                        ...prevData,
                        wasteDistribution: distribution
                    }));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchUserData();
    }, [user]);

    // Process waste logs to generate distribution data
    const processWasteLogs = (logs) => {
        // Create a map to count items by category
        const categoryCounts = {
            'plastic': 0,
            'paper': 0,
            'glass': 0,
            'metal': 0,
            'cardboard': 0,
            'trash': 0
        };
        
        // Count items by category
        logs.forEach(log => {
            const category = log.itemType.toLowerCase();
            if (categoryCounts.hasOwnProperty(category)) {
                categoryCounts[category]++;
            }
        });
        
        // Convert to array format needed for chart
        return Object.entries(categoryCounts).map(([category, count]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            count
        }));
    };

    // Calculate total recycled items (excluding trash)
    const totalRecycledItems = userData.wasteDistribution
        .filter(item => item.category.toLowerCase() !== 'trash')
        .reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Your EcoLens Dashboard</h2>
            
            <div className="dashboard-summary">
                <div className="summary-card">
                    <FaRecycle size={30} style={{ color: '#4CAF50', marginBottom: '10px' }} />
                    <h3>Total Items Recycled</h3>
                    <div className="summary-value">
                        {loading ? '...' : totalRecycledItems}
                    </div>
                </div>
                <div className="summary-card">
                    <FaLeaf size={30} style={{ color: '#4CAF50', marginBottom: '10px' }} />
                    <h3>Environmental Impact</h3>
                    <div className="summary-value">
                        {totalRecycledItems > 0 ? 'Positive' : 'Neutral'}
                    </div>
                </div>
                <div className="summary-card">
                    <FaTrophy size={30} style={{ color: '#4CAF50', marginBottom: '10px' }} />
                    <h3>Community Rank</h3>
                    <div className="summary-value">{user ? '#5' : '-'}</div>
                </div>
            </div>
            
            <div className="dashboard-grid">
                <div className="dashboard-item">
                    <ImpactTracker />
                </div>
                
                <div className="dashboard-item">
                    <WasteDistributionChart data={userData.wasteDistribution} />
                </div>
                
                <div className="dashboard-item">
                    <Leaderboard rankings={userData.rankings} />
                </div>
                
                <div className="dashboard-item">
                    <Rewards rewards={userData.rewards} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;