import { useState } from "react";
import DetailsSpace from "./Detailes/DetailsSpace";
import { HeaderCard } from "./HeaderCards/HeaderCard";
import { Box, Container, Typography } from "@mui/material";
import NoDetailes from "./Detailes/NoDetailes";

export default function DashBoard() {
  const BASE_URL = "http://localhost:3222/api/";
  const [data, setData] = useState();
  console.log(data);
  

  return (
    <>
      <Container sx={{ display: "flex", flexWrap: "nowrap" }}>
        <HeaderCard
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/deadliest-attack-types"}
        />
        <HeaderCard
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/deadliest-attack-types"}
        />
        <HeaderCard
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/deadliest-attack-types"}
        />
        <HeaderCard
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/deadliest-attack-types"}
        />
      </Container>
      
      <Box>
        {data ? <DetailsSpace data={data} /> : <NoDetailes/>}
      </Box>
    </>
  );
}
