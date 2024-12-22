import { FC } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { Button, CardActions, Container } from "@mui/material";
import { HeaderCardProps } from "../../../interface/HeaderCardProps";
import { getDeadliestAttackTypes } from "../../../services/dataService";

const HeaderCard: FC<HeaderCardProps> = ({
  urlToMakeGetRequest,
  setData
}: HeaderCardProps): JSX.Element => {

  const handleClick = async () => {
    const data = await getDeadliestAttackTypes(urlToMakeGetRequest);
    setData(data);
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 345, margin: "3px" }}
          onClick={handleClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            color="primary"
            sx={{ width: "100%" }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export { HeaderCard };
