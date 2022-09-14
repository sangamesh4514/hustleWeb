import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const SkillCard = ({ name, image, handleSkill }) => {
  return (
    <>
      <Card
        sx={{ maxWidth: 200, border: "0.1px solid #d2d2d2" }}
        elevation={1}
        onClick={() => {
          handleSkill(name);
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="150" image={image} />

          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardActionArea>
      </Card>
    </>
  );
};

export default SkillCard;
