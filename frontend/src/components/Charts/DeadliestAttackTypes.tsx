import { Box, Typography, useTheme } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components for Bar Chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeadliestAttackTypes = () => {
  const theme = useTheme();

  // Data for the Bar Chart
  const data = {
    labels: ['Planes'],
    datasets: [
      {
        label: 'Ready for mission',
        data: [7],
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
      {
        label: 'Needs repair',
        data: [4],
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.dark,
        borderWidth: 1,
      },
      {
        label: 'Needs equipment',
        data: [3],
        backgroundColor: '#F39C12',
        borderColor: theme.palette.error.dark,
        borderWidth: 1,
      }
    ],
  };

  // Options for the Bar Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Value: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        type: 'linear' as const, // Explicitly specify the scale type
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          beginAtZero: true,
          callback: (value: string | number) => `${value}`, // Ensure compatibility
        },
      },
    },
  };

  return (
    <Box
      sx={{
        margin: '10px',
        p: 3,
        borderRadius: theme.shape.borderRadius,
        background: 'rgba(255, 255, 255, 0.75)',
        boxShadow: '0px 0px 100px 20px'
      }}
    >
      <Typography variant="h6" fontSize='30px' gutterBottom>
        Planes 
      </Typography>
      <Bar data={data} options={options}/>
    </Box>
  );
};

export default DeadliestAttackTypes;
