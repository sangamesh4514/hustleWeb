import { Avatar, Grid, IconButton, Rating } from "@mui/material";
import React from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const CommentCard = ({
  comment,
  userId,
  index,
  handleLike,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Grid
      item
      xs={12}
      style={{ borderTop: "0.1px solid #d2d2d2", padding: "10px 0px " }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              {comment.authorImage ? (
                <></>
              ) : (
                <Avatar
                  style={{ textTransform: "capitalize", fontSize: "15px" }}
                  sx={{ width: 35, height: 35 }}
                >
                  {comment.authorName[0]}
                </Avatar>
              )}
            </Grid>
            <Grid
              item
              xs={7}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingBottom: "2px",
              }}
            >
              <span style={{ fontSize: "16px" }}>
                {comment.authorName || "Unknown"}
              </span>
              <Rating
                value={comment?.rating}
                readOnly
                max={5}
                precision={0.1}
                name="rating"
                sx={{ fontSize: "15px", color: "green" }}
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {" "}
              <span style={{ fontSize: "12px" }}>
                {new Date(comment.contentDate).toLocaleDateString()}
              </span>
              {/* <span style={{ fontSize: "12px" }}>
                ({Math.floor(
                  Math.abs(new Date() - new Date(comment.contentDate)) /
                    (1000 * 60 * 60 * 24)
                )}){" "}
                day ago
              </span> */}
              {/* <span style={{ fontSize: "12px" }}>
                {new Date(comment.contentDate).toLocaleTimeString()}
              </span> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ padding: "5px" }}>
          <span style={{ width: "100px", whiteSpace: "pre-line" }}>
            {comment.content}
          </span>
        </Grid>
        <Grid item xs={12}>
          {userId === comment.authorId ? (
            <div>
              {/* <IconButton onClick={(e) => handleEdit(comment.commentId)}>
                <EditOutlinedIcon />
              </IconButton> */}
              <IconButton onClick={(e) => handleDelete(comment.commentId)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              <span>({comment.likes.length} Likes)</span>
            </div>
          ) : (
            <div>
              <IconButton onClick={(e) => handleLike(comment.commentId, index)}>
                {comment.likes.includes(userId) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
              </IconButton>
              <span>({comment.likes.length})</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentCard;
