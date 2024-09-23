import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getEventStats } from '../Api';  
import '../css/Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { eventId } = useParams();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log(eventId);

                const response = await getEventStats(eventId);
                setStats(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching event stats:', error);
            }
        };
        fetchStats();
    }, [eventId]);

    if (!stats) {
        return <p>Loading statistics...</p>;
    }

    const options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20, 
                    font: {
                        size: 14, 
                    },
                    boxWidth: 5, 
                },
                position: 'bottom', 
            },
        },
        maintainAspectRatio: false, 
    };

    const pieData = {
        labels: ['  Tickets Available', '  Tickets Sold', '  Attendees'],
        datasets: [{
            data: [
                stats.totalTickets - stats.ticketsSold,  
                stats.ticketsSold,                       
                stats.attendees                          
            ],
            backgroundColor: ['#ff6700', '#63cf38', '#3b82f6'],  
        }],
    };

 

    return (
        <div className='statistics'>
        <div className="event-stats-container">
            <div className="stats-summary">
                <div className="stats-box total-tickets">
                    <h3>Total Tickets</h3>
                    <p>{stats.totalTickets}</p>
                </div>
                <div className="stats-box tickets-sold">
                    <h3>Tickets Sold</h3>
                    <p>{stats.ticketsSold}</p>
                </div>
                <div className="stats-box attendees">
                    <h3>Attendees</h3>
                    <p>{stats.attendees}</p>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart pie-chart">
                    <h3>Ticket Types Distribution</h3>
                    <Pie data={pieData} options={options} />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;










