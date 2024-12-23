import { useState } from "react";
import { HeaderCard } from "./HeaderCards/HeaderCard";
import { Box, Container } from "@mui/material";
import NoDetailes from "./Detailes/NoDetailes";
import { TerrorEvent } from "../../interface/TerrorEvent";
import DetailsSpace from "./Detailes/DetailsSpace";

export default function DashBoard() {
  const BASE_URL = "http://localhost:3222/api/";
  const [data, setData] = useState<Partial<TerrorEvent[]>>();
  const [urlToMakeGetData, setUrlToMakeGetData] = useState("");
  return (
    <>
      <Container
        sx={{ display: "flex", flexWrap: "nowrap", marginBottom: "20px" }}
      >
        <HeaderCard
          setUrlToMakeGetData={setUrlToMakeGetData}
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/deadliest-attack-types"}
        />
        <HeaderCard
          setUrlToMakeGetData={setUrlToMakeGetData}
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/highest-casualty-regions"}
        />
        <HeaderCard
          setUrlToMakeGetData={setUrlToMakeGetData}
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "analysis/incident-trends"}
        />
        <HeaderCard
          setUrlToMakeGetData={setUrlToMakeGetData}
          setData={setData}
          urlToMakeGetRequest={BASE_URL + "relationships/top-groups"}
        />
      </Container>

      <Box sx={{ marginBottom: "20px" }}>
        {data ? (
          <DetailsSpace data={data} urlToMakeGetData={urlToMakeGetData} />
        ) : (
          <NoDetailes />
        )}
      </Box>
    </>
  );
}
