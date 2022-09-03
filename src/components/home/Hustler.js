import React, { useState, useEffect } from "react";
import { Grid, Button, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getHustler,
  toggleCommentLikes,
} from "../api/api";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import AddComment from "./AddComment";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import { useSelector } from "react-redux";
import CommentCard from "../common/CommentCard";

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

const Hustler = () => {
  const [hustler, setHustler] = useState(null);
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const profile = useSelector((state) => state.profile);
  const { hustlerId } = useParams();
  const navigate = useNavigate();
  const userType = Number(localStorage.getItem("userType"));
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getHustlerData();
    return () => {};
  }, []);

  console.log(hustler);
  const getHustlerData = async () => {
    try {
      setLoader(true);
      const res = await getHustler(hustlerId);
      console.log(res?.data);
      setHustler(res?.data);
      getComments();
    } catch (error) {
      setLoader(false);
      setAlertInfo({
        open: true,
        message: "Server under maintainance, Try again later!",
        type: 1,
      });
      console.log(error);
    }
  };
  console.log(comments);

  const getComments = async () => {
    setLoader(true);
    await getAllComments(hustlerId)
      .then((res) => {
        setLoader(false);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setAlertInfo({
          open: true,
          message: "Server under maintainance, Try again later!",
          type: 1,
        });
      });
  };

  const handleOpenComment = () => {
    setOpenComment(false);
  };
  const handleExpandClick = async () => {
    setExpanded(!expanded);
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleAlertClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
  };

  const handleCall = () => {
    window.open(`tel:${hustler.phoneNumber}`, "_self");
  };

  const handleSubmit = async (rating, comment) => {
    let author;
    if (userType == 0) {
      author = profile.user;
    } else {
      author = profile.hustler;
    }
    if (rating < 1) {
      setAlertInfo({
        open: true,
        message: "Please provide a rating!",
        type: 2,
      });
    } else if (comment.replace(/\s/g, "").length < 10) {
      setAlertInfo({
        open: true,
        message: "Comment should be atLeast 10 characters!",
        type: 2,
      });
    } else if (!author.name) {
      setAlertInfo({
        open: true,
        message: "Please add your name before rating!",
        type: 2,
      });
    } else {
      handleOpenComment();
      setLoader(true);

      console.log(author);
      const data = {
        authorId: author.userId,
        authorName: author.name,
        rating,
        authorPhoneNumber: author.phoneNumber,
        authorImage: author.image,
        content: comment,
      };

      await createComment(hustlerId, data)
        .then(async (res) => {
          console.log(res);
          // setAlertInfo({
          //   open: true,
          //   message: "Comment added successfully!",
          //   type: 0,
          // });
          await getHustlerData();
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setAlertInfo({
            open: true,
            message: "Server under maintainance, Try again later!",
            type: 1,
          });
        });
    }
  };

  const handleLike = async (commentId) => {
    setLoader(true);
    if (userId) {
      await toggleCommentLikes(commentId, { userId })
        .then(async (res) => {
          console.log(res);
          await getComments();
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setAlertInfo({
            open: true,
            message: "Server under maintainance, Try again later!",
            type: 1,
          });
        });
    } else {
      setLoader(false);
      setAlertInfo({
        open: true,
        message: "Server under maintainance, Try again later!",
        type: 1,
      });
    }
  };

  const handleEdit = async (id) => {
    //dont add , it might create issues between users for v1
  };

  const handleDelete = async (id) => {
    setLoader(true);
    await deleteComment(id)
      .then(async (res) => {
        console.log(res);
        await getHustlerData();
      })
      .catch((err) => {
        setLoader(false);
        setAlertInfo({
          open: true,
          message: "Server under maintainance, Try again later!",
          type: 1,
        });
        console.log(err);
      });
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        style={{
          height: "56px",
          background: "white",
          borderBottom: "0.1px solid #d2d2d2",
        }}
        elevation={1}
      >
        <Toolbar style={{ height: "100%", width: "100%", padding: "0px" }}>
          <Grid container>
            <Grid item xs={2}>
              <Button
                style={{
                  height: "100%",
                  width: "100%",
                  color: "black",
                }}
                onClick={handleBack}
              >
                <ArrowBackIosIcon />
              </Button>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {hustler?.userName}
            </Grid>
            <Grid item xs={2}>
              <Button
                style={{
                  height: "100%",
                  width: "100%",
                  color: "black",
                }}
              >
                <BookmarkBorderOutlinedIcon />
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {hustler ? (
        <Grid container style={{ paddingTop: "60px", paddingBottom: "64px" }}>
          <Grid item xs={12}>
            <Grid container style={{ padding: "10px" }}>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ width: 80, height: 80 }}>
                  <PersonIcon />
                </Avatar>
                <span>{hustler?.name}</span>
              </Grid>
              <Grid
                item
                xs={5}
                style={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "1px 10px",
                }}
              >
                <span style={{ fontSize: "25px", textTransform: "capitalize" }}>
                  {hustler?.skill || "-"}
                </span>

                <span style={{ fontSize: "20px", paddingTop: "10px" }}>
                  Skill
                </span>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "10px 10px",
                }}
              >
                <span style={{ fontSize: "25px" }}>{hustler?.experience}+</span>
                <span
                  style={{
                    fontSize: "20px",
                    paddingTop: "10px",
                  }}
                >
                  Exp
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
                >
                  {" "}
                  <span style={{ whiteSpace: "pre-line" }}>
                    {hustler.description}
                  </span>
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
                      <span>{hustler.city}</span>
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
                      <span>{hustler.languages.join(",")}</span>
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
                      <Tooltip title="Standard Inspection Charges">
                        <span>SIC -</span>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8}>
                      {hustler.SIC ? (
                        <span>{hustler.SIC}</span>
                      ) : (
                        <span>Not Verified</span>
                      )}
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
                        value={hustler?.ratingValue}
                        readOnly
                        max={5}
                        precision={0.1}
                        name="rating"
                        sx={{ fontSize: "18px", color: "green" }}
                      />
                      <span style={{ fontSize: "15px" }}>
                        ({hustler?.ratingsCount})
                      </span>
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
                    <Grid
                      item
                      xs={9}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span>Reviews and Comments ({hustler.ratingsCount})</span>
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
                    <Grid item xs={1}>
                      {hustlerId !== userId ? (
                        <IconButton
                          style={{ padding: "2px" }}
                          onClick={(e) => setOpenComment(true)}
                        >
                          <AddIcon style={{ fontSize: "25px" }} />
                        </IconButton>
                      ) : null}
                    </Grid>
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
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                        />
                      ))}
                  </Collapse>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} style={{ padding: "10px" }}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: "green" }}
              onClick={handleCall}
            >
              Make a Call
            </Button>
          </Grid>
        </Grid>
      ) : null}

      <AddComment
        open={openComment}
        handleClose={handleOpenComment}
        handleSubmit={handleSubmit}
      />
      <Loader open={loader} />
      <Alert
        open={alertInfo.open}
        message={alertInfo.message}
        type={alertInfo.type}
        handleClose={handleAlertClose}
      />
    </>
  );
};

export default Hustler;
