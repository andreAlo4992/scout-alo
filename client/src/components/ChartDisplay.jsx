import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ChartDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/statistiche').then(res => setData(res.data));
  }, []);

  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="totale" fill="#8884d8" />
    </BarChart>
  );
}
