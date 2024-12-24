import DetailsSpaceWithGraph from "../../DetailsSpaceWithGraph";
import DetailsSpaceByYearsWithGraph from "./DetailsSpaceByYearsWithGraph";
import GroupsByYear from "./GroupsByYear";
import CasualtyMap from "./MapC";
import TerrorEventList from "./TerrorEventList";
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
    urlToMakeGetData === "http://localhost:3222/api/relationships/top-groups"
  ) {
    return <TopTerrorGroupsByRegion urlToMakeGetRequest={urlToMakeGetData} />;
  }
  if (
    urlToMakeGetData ===
    "http://localhost:3222/api/relationships/groups-by-year"
  ) {
    return <GroupsByYear urlToMakeGetRequest={urlToMakeGetData} />;
  }
  if (
    urlToMakeGetData ===
    "http://localhost:3222/api/getLimitTerrorEvents?page=1&limit=50"
  ) {
    return <TerrorEventList data={data} />;
  }
  return <div>DetailsSpace</div>;
}
