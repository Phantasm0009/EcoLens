import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = ({ rankings = [] }) => {
    const [leaderboardData, setLeaderboardData] = useState(rankings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const data = await getLeaderboard();
                setLeaderboardData(data);
            } catch (err) {
                setError('Failed to load leaderboard data');
                console.error('Error fetching leaderboard:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchLeaderboard();
    }, []);

    if (loading) return <div>Loading leaderboard...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="leaderboard">
            <h2>Community Leaderboard</h2>
            {leaderboardData.length === 0 ? (
                <p>No leaderboard data available yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Eco Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((user, index) => (
                            <tr key={user.id || index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.ecoImpact} CO₂ saved</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;