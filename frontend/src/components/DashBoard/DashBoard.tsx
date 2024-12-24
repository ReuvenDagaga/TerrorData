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
    <Box
      sx={{
        marginTop: "10vh",
      }}
    >
      <Container
        sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: "20px" }}
      >
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <HeaderCard
            btnText="Get Deadliest By Attack Types"
            setUrlToMakeGetData={setUrlToMakeGetData}
            setData={setData}
            urlToMakeGetRequest={BASE_URL + "analysis/deadliest-attack-types"}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <HeaderCard
            btnText="Get Highest Casualty Regions"
            setUrlToMakeGetData={setUrlToMakeGetData}
            setData={setData}
            urlToMakeGetRequest={BASE_URL + "analysis/highest-casualty-regions"}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <HeaderCard
            btnText="Get Incident Trends"
            setUrlToMakeGetData={setUrlToMakeGetData}
            setData={setData}
            urlToMakeGetRequest={BASE_URL + "analysis/incident-trends"}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <HeaderCard
            btnText="Get Top Groups"
            setUrlToMakeGetData={setUrlToMakeGetData}
            setData={setData}
            urlToMakeGetRequest={BASE_URL + "relationships/top-groups"}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <HeaderCard
            btnText="Get Groups By Year"
            setUrlToMakeGetData={setUrlToMakeGetData}
            setData={setData}
            urlToMakeGetRequest={BASE_URL + "relationships/groups-by-year"}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <HeaderCard
            btnText="Get All Terror Events"
            setUrlToMakeGetData={setUrlToMakeGetData}
            setData={setData}
            urlToMakeGetRequest={
              BASE_URL + "getLimitTerrorEvents?page=1&limit=50"
            }
          />
        </Box>
      </Container>

      <Box sx={{ marginBottom: "20px" }}>
        {data ? (
          <DetailsSpace data={data} urlToMakeGetData={urlToMakeGetData} />
        ) : (
          <NoDetailes />
        )}
      </Box>
    </Box>
  );
}
