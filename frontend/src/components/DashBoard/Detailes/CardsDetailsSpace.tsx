import { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { TerrorEventDetailsSpaceDTO } from "../../../interface/TerrorEventDetailsSpaceDTO";
import Graph from "../../Charts/DeadliestAttackTypesGraph";

interface DetailsSpaceProps {
  data: TerrorEventDetailsSpaceDTO[];
}

export default function CardsDetailsSpace({ data }: DetailsSpaceProps) {
  const [selectedItem, setSelectedItem] =
    useState<TerrorEventDetailsSpaceDTO | null>(null);

  const handleOpenDetails = (item: TerrorEventDetailsSpaceDTO) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  if (selectedItem) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "65vh",
          background: "rgba(119, 139, 212, 0.23)",
          marginBottom: "20px",
          width: "100%",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px", color: "#333" }}>
          Details
        </Typography>
        <Graph
          labels={data.map((item) => item._id)}
          data={data.map((item) => item.totalKills)}
          title={`Total Kills`}
          color="rgba(255, 99, 132, 0.6)"
        />
        <Button
          variant="outlined"
          
          color="primary"
          sx={{ marginTop: "20px", backgroundColor: "rgb(143, 191, 255)" }}
          onClick={handleBackToList}
        >
          Back to List
        </Button>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "65vh",
        background: "rgba(119, 139, 212, 0.23)",
        marginBottom: "20px",
        width: "100%",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      {data?.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "90%",
            maxWidth: "500px",
            minHeight: "130px",
            padding: "3px",
            display: "flex",
            flexDirection: "column",
            margin: "5px",
            justifyContent: "space-between",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            background: "#ffffff",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#333",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Number Of Killed: {item?.totalKills}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                flex: 2,
                color: "#555",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginLeft: "10px",
              }}
            >
              {item?._id}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ minWidth: "100px", marginLeft: "10px" }}
              onClick={() => handleOpenDetails(item)}
            >
              Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
