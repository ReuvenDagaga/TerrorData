import DetailsSpaceWithGraph from "../../DetailsSpaceWithGraph";
import DetailsSpaceByYearsWithGraph from "./DetailsSpaceByYearsWithGraph";
import CasualtyMap from "./MapC";
import TopTerrorGroupsByRegion from "./TopTerrorGroupsByRegion";

interface Props {
  data: any;
  urlToMakeGetData: string;
}

export default function DetailsSpace({ data, urlToMakeGetData }: Props) {

  if (
    urlToMakeGetData ===
    "http://localhost:3222/api/analysis/deadliest-attack-types"
  ) {
    return <DetailsSpaceWithGraph data={data} />;
  } else if (
    urlToMakeGetData ===
    "http://localhost:3222/api/analysis/highest-casualty-regions"
  ) {
    return <CasualtyMap data={data} />;
  } else if (
    urlToMakeGetData === "http://localhost:3222/api/analysis/incident-trends"
  ) {
    return (
      <DetailsSpaceByYearsWithGraph urlToMakeGetRequest={urlToMakeGetData} />
    );
  } else if (
    urlToMakeGetData ===
    "http://localhost:3222/api/relationships/top-groups"
  ) {
    return <TopTerrorGroupsByRegion urlToMakeGetRequest={urlToMakeGetData} />;
  }

  console.log(urlToMakeGetData);
  return <div>DetailsSpace</div>;
}
