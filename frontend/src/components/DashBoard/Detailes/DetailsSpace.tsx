import DetailsSpaceWithGraph from "../../DetailsSpaceWithGraph";
import DetailsSpaceByYearsWithGraph from "./DetailsSpaceByYearsWithGraph";
import CasualtyMap from "./MapC";

interface Props {
  data: any;
  urlToMakeGetData: string;
}

export default function DetailsSpace({ data, urlToMakeGetData }: Props) {
    console.log(urlToMakeGetData);
    

    if (
      urlToMakeGetData ===
      "http://localhost:3222/api/analysis/deadliest-attack-types"
    ) {
      return <DetailsSpaceWithGraph data={data} />;
    }
    else if (
      urlToMakeGetData ===
      "http://localhost:3222/api/analysis/highest-casualty-regions"
    ) {
      return <CasualtyMap data={data} />;
    }
    else if (
      urlToMakeGetData === "http://localhost:3222/api/analysis/incident-trends"
    ) {
      return 
       <h1>efgwgadfrhbgdanhgfsjn</h1>
    
    }
    else if (
      urlToMakeGetData ===
      "http://localhost:3222/api/analysis/deadliest-attack-types"
    ) {
      return <DetailsSpaceWithGraph data={data} />;
    }
  
  console.log(urlToMakeGetData);
  return <div>DetailsSpace</div>;
}
