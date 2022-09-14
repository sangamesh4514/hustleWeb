import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Grid, CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "../common/Button";
import Rating from "@mui/material/Rating";
import Switch from "../common/Switch";
import DetailsCard from "../common/DetailsCard";
import { editHustler, clearProfile } from "../slices/profileSlice";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import { getAllComments, toggleCommentLikes } from "../api/api";
import { skillOptions } from "../home/data";

const HustlerProfile = () => {
  const user = useSelector((state) => state.profile.hustler);
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getCommentsNoLoader();
    return () => {};
  }, []);

  const editUser = () => {
    navigate("../../edit/hustler");
  };

  const handleStatus = (e) => {
    setLoader(true);
    dispatch(
      editHustler({ userId, data: { status: e.target.checked ? 1 : 0 } })
    )
      .unwrap()
      .then((res) => {
        setLoader(false);
        setAlertInfo({
          open: true,
          message: "Status updated succesfully!",
          type: 0,
        });
      })
      .catch((err) => {
        setLoader(false);
        setAlertInfo({
          open: true,
          message: "Server under maintainance!",
          type: 1,
        });
      });
  };
  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
  };
  const handleExpandClick = async () => {
    setExpanded(!expanded);
  };
  const logout = () => {
    localStorage.clear();
    dispatch(clearProfile());
    navigate("../../");
  };
  const getCommentsNoLoader = async () => {
    await getAllComments(userId)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAlertInfo({
          open: true,
          message: "Server under maintainance , Try comments later!",
          type: 1,
        });
      });
  };
  const getComments = async () => {
    setLoader(true);
    await getAllComments(userId)
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
  return (
    <>
      <Grid container style={{ paddingTop: "10px", paddingBottom: "64px" }}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <span style={{ fontFamily: "bold" }}>
            <b>{user?.userName || "USER NAME"}</b>
          </span>
        </Grid>
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
                padding: "0px 10px",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    //justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    <Grid item xs={8}>
                      <span
                        style={{
                          fontSize: "25px",
                        }}
                      >
                        {skillOptions[user.skill] || "-"}
                      </span>
                    </Grid>
                    <Grid item xs={4}>
                      <Switch checked={user?.status} onChange={handleStatus} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  // style={{
                  //   display: "flex",
                  //   justifyContent: "space-between",
                  //    alignItems: "top",
                  // }}
                >
                  <Grid container>
                    <Grid item xs={8}>
                      <span style={{ fontSize: "20px" }}>Skill</span>
                    </Grid>
                    <Grid item xs={4}>
                      <span style={{ fontSize: "20px", width: "50px" }}>
                        Status
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ padding: "0px 10px 10px 10px" }}>
          <Button
            value={"EDIT PROFILE"}
            onClick={() => {
              editUser();
            }}
            variant="outlined"
            style={{
              width: "100%",
              padding: "5px 10px",
              color: "black",
            }}
          />
        </Grid>
        {/* <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px 10px",
            overflow: "auto",
          }}
        >
          {user?.stories?.map((item) => {
            return (
              <Avatar key={item} sx={{ width: 60, height: 60 }}>
                {item}
              </Avatar>
            );
          })}
          <Avatar sx={{ width: 60, height: 60 }}>+</Avatar>
          {user?.stories?.length ? null : (
            <span style={{ textAlign: "center" }}>
              Stories are Evidence of your work!
            </span>
          )}
        </Grid> */}
        <Grid item xs={12}>
          <DetailsCard
            user={user}
            comments={comments}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            handleLike={handleLike}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 10px",
          }}
        >
          {/* <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Saved Profiles</span>
          </CardActionArea> */}
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Guidelines</span>
          </CardActionArea>
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Refer a friend</span>
          </CardActionArea>

          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Feedback</span>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 10px" }}>
          <Button
            value={"LOGOUT"}
            onClick={() => {
              logout();
            }}
            style={{
              width: "100%",
              padding: "5px 10px",
              background: "green",
            }}
          />
        </Grid>
      </Grid>
      <Loader open={loader} />
      <Alert
        open={alertInfo.open}
        message={alertInfo.message}
        type={alertInfo.type}
        handleClose={handleClose}
        position={["top", "left"]}
      />
    </>
  );
};

export default HustlerProfile;
