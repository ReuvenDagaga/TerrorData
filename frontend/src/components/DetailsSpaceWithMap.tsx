import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
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

interface TerrorEventDetailsSpaceDTO {
  _id: string; // סוג התקפה (ID)
  totalKills: number; // מספר ההרוגים
}

interface GraphProps {
  data: TerrorEventDetailsSpaceDTO[];
}

export default function DetailsSpaceWithMap({ data }: GraphProps) {
  // מצב עבור הקטגוריות המסוננות
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // פונקציה לעדכון הקטגוריות המסוננות
  const toggleCategory = (category: string) => {
    setFilteredCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // אם הקטגוריה כבר קיימת, נסיר אותה
        : [...prev, category] // אחרת, נוסיף אותה
    );
  };

  // נתונים מסוננים
  const filteredData = filteredCategories.length
    ? data.filter((item) => filteredCategories.includes(item._id))
    : data; 

  const chartData = {
    labels: filteredData.map((item) => item._id), 
    datasets: [
      {
        label: "Total Kills",
        data: filteredData.map((item) => item.totalKills), 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Attack Types",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Kills",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        background: "rgba(119, 139, 212, 0.23)",
        padding: "20px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#333" }}>
        Total Kills by Attack Type
      </Typography>

      <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {data.map((item) => (
          <Button sx={{ fontSize: "12px", padding: "3px 5px"}}
          key={item._id}
          variant={filteredCategories.includes(item._id) ? "contained" : "outlined"}
          onClick={() => toggleCategory(item._id)}
        >
          {item._id}
        </Button>
        ))}
      </Stack>

      <Bar data={chartData} options={options} />
    </Box>
  );
}