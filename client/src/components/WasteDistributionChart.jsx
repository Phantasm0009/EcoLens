import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const WasteDistributionChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;
        
        const ctx = chartRef.current.getContext('2d');
        
        // Destroy previous chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        
        // Create colors based on categories
        const getColor = (category) => {
            switch (category.toLowerCase()) {
                case 'plastic': return '#2196F3';
                case 'paper': return '#FFC107';
                case 'glass': return '#4CAF50';
                case 'metal': return '#9C27B0';
                case 'cardboard': return '#FF9800';
                case 'trash': return '#F44336';
                default: return '#607D8B';
            }
        };
        
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.category),
                datasets: [{
                    data: data.map(item => item.count),
                    backgroundColor: data.map(item => getColor(item.category)),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Your Recycling Distribution',
                        font: {
                            size: 16
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef} height="260"></canvas>
        </div>
    );
};

export default WasteDistributionChart;