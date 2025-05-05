import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserWasteLogs } from '../services/api';
import { FaRecycle, FaTrash, FaGlassWhiskey, FaBox, FaFileAlt, FaFilter, FaChevronDown, FaChevronUp, FaHistory, FaChartPie } from 'react-icons/fa';
import { format } from 'date-fns';

const History = () => {
    const { user } = useContext(AuthContext);
    const [wasteLogs, setWasteLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);
    const [groupedLogs, setGroupedLogs] = useState({});
    
    // Mock waste logs for demonstration
    const mockWasteLogs = [
        {
            _id: '1',
            userId: '123',
            itemType: 'plastic',
            imageUrl: 'https://via.placeholder.com/100x100?text=Plastic+Bottle',
            scannedAt: new Date('2025-04-30T10:24:00'),
            impact: { co2Saved: 0.5, materialsRecycled: 15 }
        },
        {
            _id: '2',
            userId: '123',
            itemType: 'paper',
            imageUrl: 'https://via.placeholder.com/100x100?text=Paper',
            scannedAt: new Date('2025-04-29T14:15:00'),
            impact: { co2Saved: 0.2, materialsRecycled: 10 }
        },
        {
            _id: '3',
            userId: '123',
            itemType: 'glass',
            imageUrl: 'https://via.placeholder.com/100x100?text=Glass+Jar',
            scannedAt: new Date('2025-04-28T09:45:00'),
            impact: { co2Saved: 0.3, materialsRecycled: 25 }
        },
        {
            _id: '4',
            userId: '123',
            itemType: 'metal',
            imageUrl: 'https://via.placeholder.com/100x100?text=Aluminum+Can',
            scannedAt: new Date('2025-04-27T16:30:00'),
            impact: { co2Saved: 0.8, materialsRecycled: 12 }
        },
        {
            _id: '5',
            userId: '123',
            itemType: 'trash',
            imageUrl: 'https://via.placeholder.com/100x100?text=Food+Wrapper',
            scannedAt: new Date('2025-04-26T11:20:00'),
            impact: { co2Saved: 0, materialsRecycled: 0 }
        }
    ];

    useEffect(() => {
        if (!user) return;

        const fetchWasteLogs = async () => {
            setLoading(true);
            try {
                // Comment out actual API call and use mock data for now
                // const logs = await getUserWasteLogs(user._id);
                // setWasteLogs(logs);
                setWasteLogs(mockWasteLogs);
                
                // Group logs by date for better display
                const grouped = mockWasteLogs.reduce((acc, log) => {
                    const date = format(new Date(log.scannedAt), 'yyyy-MM-dd');
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(log);
                    return acc;
                }, {});
                
                setGroupedLogs(grouped);
            } catch (error) {
                console.error('Error fetching waste logs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWasteLogs();
    }, [user]);

    const getIcon = (category) => {
        switch (category) {
            case 'plastic': return <FaRecycle className="category-icon plastic" />;
            case 'glass': return <FaGlassWhiskey className="category-icon glass" />;
            case 'metal': return <FaRecycle className="category-icon metal" />;
            case 'paper': return <FaFileAlt className="category-icon paper" />;
            case 'cardboard': return <FaBox className="category-icon cardboard" />;
            case 'trash':
            default: return <FaTrash className="category-icon trash" />;
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    
    const toggleItemDetails = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    };

    const filteredLogs = wasteLogs.filter(log => {
        if (filter === 'all') return true;
        return log.itemType === filter;
    });

    // Calculate statistics
    const totalItems = wasteLogs.length;
    const recycledItems = wasteLogs.filter(log => log.itemType !== 'trash').length;
    const recycleRate = totalItems > 0 ? Math.round((recycledItems / totalItems) * 100) : 0;
    const totalCO2Saved = wasteLogs.reduce((sum, log) => sum + (log.impact?.co2Saved || 0), 0);

    if (!user) {
        return (
            <div className="page-container history-page">
                <div className="card text-center">
                    <h2>Scan History</h2>
                    <p>Please log in to view your scanning history.</p>
                    <a href="/login" className="btn btn-primary">Log In</a>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container history-page">
            <div className="page-header">
                <h1><FaHistory className="header-icon" /> Your Recycling History</h1>
                <p className="subtitle">Track your recycling progress and environmental impact over time</p>
            </div>
            
            <div className="history-stats-container">
                <div className="history-stats">
                    <div className="stat-card">
                        <h3>Total Items Scanned</h3>
                        <div className="stat-value">{totalItems}</div>
                    </div>
                    
                    <div className="stat-card">
                        <h3>Items Recycled</h3>
                        <div className="stat-value">{recycledItems}</div>
                    </div>
                    
                    <div className="stat-card">
                        <h3>Recycle Rate</h3>
                        <div className="stat-value">{recycleRate}%</div>
                    </div>
                    
                    <div className="stat-card">
                        <h3>CO₂ Saved</h3>
                        <div className="stat-value">{totalCO2Saved.toFixed(1)} kg</div>
                    </div>
                </div>
            </div>
            
            <div className="history-content">
                <div className="history-filters">
                    <div className="filter-header">
                        <h2>Scan History</h2>
                        <button className="filter-toggle-btn" onClick={toggleFilters}>
                            <FaFilter /> Filter
                            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    </div>
                    
                    {showFilters && (
                        <div className="filter-options">
                            <button 
                                className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                                onClick={() => setFilter('all')}
                            >
                                All Items
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'plastic' ? 'active' : ''}`} 
                                onClick={() => setFilter('plastic')}
                            >
                                Plastic
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'paper' ? 'active' : ''}`} 
                                onClick={() => setFilter('paper')}
                            >
                                Paper
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'glass' ? 'active' : ''}`} 
                                onClick={() => setFilter('glass')}
                            >
                                Glass
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'metal' ? 'active' : ''}`} 
                                onClick={() => setFilter('metal')}
                            >
                                Metal
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'trash' ? 'active' : ''}`} 
                                onClick={() => setFilter('trash')}
                            >
                                Trash
                            </button>
                        </div>
                    )}
                </div>
                
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading your history...</p>
                    </div>
                ) : (
                    <>
                        {filteredLogs.length === 0 ? (
                            <div className="empty-history">
                                <FaChartPie size={50} color="#ccc" />
                                <p>No waste items found in your history.</p>
                                <a href="/scan" className="btn btn-primary">Start Scanning</a>
                            </div>
                        ) : (
                            <div className="history-timeline">
                                {Object.keys(groupedLogs).map(date => {
                                    const logsForDay = groupedLogs[date].filter(log => {
                                        if (filter === 'all') return true;
                                        return log.itemType === filter;
                                    });
                                    
                                    if (logsForDay.length === 0) return null;
                                    
                                    return (
                                        <div className="history-day" key={date}>
                                            <div className="day-header">
                                                <h3>{format(new Date(date), 'EEEE, MMMM d, yyyy')}</h3>
                                            </div>
                                            
                                            <div className="day-items">
                                                {logsForDay.map(log => (
                                                    <div className="history-item" key={log._id}>
                                                        <div 
                                                            className="item-header"
                                                            onClick={() => toggleItemDetails(log._id)}
                                                        >
                                                            <div className="item-main-info">
                                                                {log.imageUrl && (
                                                                    <div className="item-thumb">
                                                                        <img src={log.imageUrl} alt={log.itemType} />
                                                                    </div>
                                                                )}
                                                                <div className="item-summary">
                                                                    <div className="item-type">
                                                                        {getIcon(log.itemType)}
                                                                        <h4>{log.itemType.charAt(0).toUpperCase() + log.itemType.slice(1)}</h4>
                                                                    </div>
                                                                    <p className="item-time">
                                                                        {format(new Date(log.scannedAt), 'h:mm a')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="item-expand">
                                                                {expandedItem === log._id ? <FaChevronUp /> : <FaChevronDown />}
                                                            </div>
                                                        </div>
                                                        
                                                        {expandedItem === log._id && (
                                                            <div className="item-details">
                                                                <div className="item-full-image">
                                                                    <img src={log.imageUrl} alt={log.itemType} />
                                                                </div>
                                                                <div className="item-impact">
                                                                    <h5>Environmental Impact</h5>
                                                                    <div className="impact-metrics">
                                                                        <div className="impact-metric">
                                                                            <span className="metric-label">CO₂ Saved:</span>
                                                                            <span className="metric-value">{log.impact?.co2Saved || 0} kg</span>
                                                                        </div>
                                                                        <div className="impact-metric">
                                                                            <span className="metric-label">Materials Recycled:</span>
                                                                            <span className="metric-value">{log.impact?.materialsRecycled || 0} g</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default History;