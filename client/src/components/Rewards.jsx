import React from 'react';

const Rewards = ({ rewards = [] }) => {
    return (
        <div className="rewards-container">
            <h2>Your Rewards</h2>
            {rewards.length === 0 ? (
                <p>No rewards earned yet. Start recycling to earn badges!</p>
            ) : (
                <ul>
                    {rewards.map((reward, index) => (
                        <li key={index} className="reward-item">
                            <h3>{reward.title}</h3>
                            <p>{reward.description}</p>
                            <span className="reward-points">{reward.points} points</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Rewards;