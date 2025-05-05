import React, { useEffect, useState, useContext } from 'react';
import { getEcoImpact } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ImpactTracker = () => {
    const { user } = useContext(AuthContext);
    const [ecoImpact, setEcoImpact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEcoImpact = async () => {
            try {
                // If no user is logged in, use mock data
                if (!user || !user._id) {
                    setEcoImpact({
                        co2Saved: 0,
                        materialsRecycled: 0,
                        rank: '-'
                    });
                    setLoading(false);
                    return;
                }

                const data = await getEcoImpact(user._id);
                setEcoImpact(data);
            } catch (err) {
                console.error('Error fetching eco impact:', err);
                setError('Failed to load impact data');
                // Use fallback data on error
                setEcoImpact({
                    co2Saved: 0,
                    materialsRecycled: 0,
                    rank: '-'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchEcoImpact();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="impact-tracker">
            <h2>Your Eco Impact</h2>
            <p>CO₂ Saved: {ecoImpact?.co2Saved || 0} kg</p>
            <p>Materials Recycled: {ecoImpact?.materialsRecycled || 0}</p>
            <p>Community Rank: {ecoImpact?.rank || '-'}</p>
        </div>
    );
};

export default ImpactTracker;