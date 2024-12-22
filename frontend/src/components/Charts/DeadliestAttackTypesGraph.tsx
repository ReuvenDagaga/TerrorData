import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraphProps {
  labels: string[]; 
  data: number[];
  title: string;
  color?: string;
}


const DeadliestAttackTypesGraph: React.FC<GraphProps> = ({
  labels,
  data,
  title,
  color = "rgba(75, 192, 192, 0.6)",
}) => {

  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: color,
        borderColor: color.replace("0.6", "1"),
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default DeadliestAttackTypesGraph;
