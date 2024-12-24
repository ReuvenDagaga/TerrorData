import { FC } from "react";
import Card from "@mui/material/Card";
import { Button, CardActions, Container } from "@mui/material";
import { HeaderCardProps } from "../../../interface/HeaderCardProps";
import { getData } from "../../../services/dataService";

const HeaderCard: FC<HeaderCardProps> = ({
  urlToMakeGetRequest,
  setUrlToMakeGetData,
  setData,
  btnText
}: HeaderCardProps): JSX.Element => {


  const handleClick = async () => {
    const data = await getData(urlToMakeGetRequest);
    setData(data);    
    setUrlToMakeGetData(urlToMakeGetRequest);
  };

  return (
    <Container sx={{ padding: "10px" }}>
      <Card sx={{ maxWidth: 345, margin: "-15px", marginTop: "10px" }}
          onClick={handleClick}
      >
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="primary"
            sx={{ width: "100%", height: "70px", background: "rgba(11, 21, 58, 0.05)" }}
          >
            {btnText}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export { HeaderCard };
