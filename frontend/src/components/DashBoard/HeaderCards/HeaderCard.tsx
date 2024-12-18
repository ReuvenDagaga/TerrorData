import { FC } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeaderCardProps } from "../../../interface/HeaderCardProps";


const HeaderCard: FC<HeaderCardProps> = ({ navigateTo,}: HeaderCardProps): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navigateTo);
  };
  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <CardMedia component="img" height="120" image="" alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" margin={0} bgcolor={"#f5f5f5"} padding={1}>
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", backgroundColor: "#f5f5f5", padding: 1.5 }}>
            Lizards are a widespread group of
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ backgroundColor: "#f5f5f5" , margin: 0 }}>
        <Button size="small" color="primary" sx={{ width: "100%", margin: 0 }}>
          SHOW MORE
        </Button>
      </CardActions>
    </Card>
  );
};

export { HeaderCard };
