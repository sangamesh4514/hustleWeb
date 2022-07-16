import React, { useState } from "react";
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

const HustlerProfile = () => {
  const user = useSelector((state) => state.profile.hustler);
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

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
  const logout = () => {
    localStorage.clear();
    dispatch(clearProfile());
    navigate("../../");
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
                  <Switch checked={user?.status} onChange={handleStatus} />
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
            location={user?.city || "None"}
            languages={user?.languages?.join(",") || "None"}
            sic={user?.SIC || "Not Verified"}
            details={user?.description}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            margin: "10px 10px",
            padding: "5px",
            border: "0.1px solid #d2d2d2",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Rating
            value={user?.ratings?.value}
            readOnly
            max={10}
            precision={1}
            name="rating"
            sx={{ fontSize: "30px" }}
          />
          <span style={{ fontSize: "1.6em" }}>({user?.ratings?.number})</span>
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
            <span style={{ fontSize: "15px" }}>
              {user?.coins} Coins [Earn more]
            </span>
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
        position={["bottom", "left"]}
      />
    </>
  );
};

export default HustlerProfile;
