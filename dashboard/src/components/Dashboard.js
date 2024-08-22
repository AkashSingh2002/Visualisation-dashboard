import React, { useEffect, useState } from 'react';
import { getData, filterData } from '../services/dataService';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getData();
    setData(result);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    const result = await filterData(filters);
    setData(result);
  };

  const chartData = {
    labels: data.map((d) => d.region),
    datasets: [
      {
        label: 'Intensity',
        data: data.map((d) => d.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Likelihood',
        data: data.map((d) => d.likelihood),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Relevance',
        data: data.map((d) => d.relevance),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <label>End Year:</label>
        <input type="text" name="end_year" onChange={handleFilterChange} />
        <label>Topic:</label>
        <input type="text" name="topic" onChange={handleFilterChange} />
        <label>Sector:</label>
        <input type="text" name="sector" onChange={handleFilterChange} />
        <label>Region:</label>
        <input type="text" name="region" onChange={handleFilterChange} />
        <label>Pestle:</label>
        <input type="text" name="pestle" onChange={handleFilterChange} />
        <label>Source:</label>
        <input type="text" name="source" onChange={handleFilterChange} />
        <label>Country:</label>
        <input type="text" name="country" onChange={handleFilterChange} />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
