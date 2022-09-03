import React from "react";
import {
  Collapse,
  Grid,
  Rating,
  Tooltip,
  styled,
  IconButton,
} from "@mui/material";
import "./styles.css";
import CommentCard from "./CommentCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DetailsCard = ({
  user,
  comments,
  handleLike,
  expanded,
  handleExpandClick,
}) => {
  const userId = localStorage.getItem("userId");

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 10px",
        border: "0.1px solid #d2d2d2",
        borderRadius: "4px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            fontWeight: "bolder",
          }}
          s
        >
          {" "}
          <span>About</span>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 10px 10px",
          }}
          s
        >
          {" "}
          <span style={{ whiteSpace: "pre-line" }}>{user.description}</span>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            borderTop: "0.1px solid #d2d2d2",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 0px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>City - </span>
            </Grid>
            <Grid item xs={8}>
              <span>{user.city}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 0px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>Langauages - </span>
            </Grid>
            <Grid item xs={8}>
              <span>{user.languages.join(",")}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 0px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>SIC -</span>
            </Grid>
            <Grid item xs={8}>
              <span>{user.SIC || "Not Verified"}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 10px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>Ratings -</span>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                value={user?.ratingValue}
                readOnly
                max={5}
                precision={0.1}
                name="rating"
                sx={{ fontSize: "18px", color: "green" }}
              />
              <span style={{ fontSize: "15px" }}>({user?.ratingsCount})</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            borderTop: "0.1px solid #d2d2d2",
          }}
        ></Grid>
        <Grid item xs={12} style={{ padding: "5px 5px 0px 5px" }}>
          <Grid container>
            <Grid item xs={9} style={{ display: "flex", alignItems: "center" }}>
              <span>Reviews and Comments ({user.ratingsCount})</span>
            </Grid>
            <Grid item xs={2}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                style={{ padding: "2px" }}
                disabled={!comments?.length}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{
              // maxHeight: "400px",
              overflow: "scroll",
              paddingTop: "5px",
            }}
          >
            {comments &&
              comments.map((comment, index) => (
                <CommentCard
                  comment={comment}
                  key={comment.commentId}
                  userId={userId}
                  index={index}
                  handleLike={handleLike}
                />
              ))}
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailsCard;
