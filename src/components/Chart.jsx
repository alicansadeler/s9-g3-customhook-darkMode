import React from 'react';
import { format, subHours } from 'date-fns';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const Chart = ({ sparklineData }) => {
  const formattedData = sparklineData
    .map((price, idx) => {
      if (idx % 6 === 0) {
        const timeToSubtract = 168 - idx;
        const date = format(subHours(new Date(), timeToSubtract), 'EEE h:mma');
        return { value: price, date };
      } else if (idx === sparklineData.length - 1) {
        const date = format(new Date(), 'EEE h:mma');
        return { value: price, date };
      }
      return null;
    })
    .filter((data) => data);

  return (
    <LineChart width={1100} height={300} data={formattedData}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" interval={3} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
