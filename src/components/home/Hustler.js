import React, { useState, useEffect } from "react";
import { Grid, Button, Paper, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { getHustler } from "../api/api";
import DetailsCard from "../common/DetailsCard";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";

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
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    return () => {};
  }, []);

  const getUser = async () => {
    try {
      setLoader(true);
      const res = await getHustler(userId);
      console.log(res.data);
      setUser(res.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleClose = () => {
    setLoader(false);
  };

  const handleCall = () => {
    console.log(user.phoneNumber);
    window.open(`tel:${user.phoneNumber}`, "_self");
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
              {user?.userName}
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
      {user ? (
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
                <span>{user?.name}</span>
              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "0px 20px",
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ height: "27px", fontSize: "25px" }}>
                      {user?.skill || "-"}
                    </span>
                    {/* <Switch checked={user?.status} onChange={handleStatus} /> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "top",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>Skill</span>
                    <span style={{ fontSize: "20px", width: "50px" }}>
                      Status
                    </span>
                  </Grid>
                </Grid>
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
                    {user.description}
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
                      <Tooltip title="Standard Inspection Charges">
                        <span>SIC -</span>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8}>
                      {user.SIC ? (
                        <span>{user.SIC}</span>
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
                        value={user?.ratings?.value}
                        readOnly
                        max={10}
                        precision={1}
                        name="rating"
                        sx={{ fontSize: "18px", color: "green" }}
                      />
                      <span style={{ fontSize: "15px" }}>
                        ({user?.ratings?.number})
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
                <Grid
                  item
                  xs={12}
                  style={{
                    padding: "5px 0px 0px 10px",
                  }}
                >
                  <span>Reviews and Comments ({user.comments.length - 1})</span>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    style={{ padding: "5px" }}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <span>show all comments</span>
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

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loader}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Hustler;
