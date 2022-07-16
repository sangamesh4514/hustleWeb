import React, { useState, useEffect } from "react";
import RegularUserProfile from "./RegularUserProfile";
import HustlerProfile from "./HustlerProfile";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getHustler } from "../slices/profileSlice";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

const Profile = () => {
  const [userType, setUserType] = useState(
    useSelector((state) => state.profile.type)
  );
  const type = Number(localStorage.getItem("userType"));
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      if (type == 0) {
        dispatch(getUser(userId))
          .unwrap()
          .then((res) => {
            setUserType(type);
          })
          .catch((err) => {});
      } else if (type == 1) {
        dispatch(getHustler(userId))
          .unwrap()
          .then((res) => {
            setUserType(type);
          })
          .catch((err) => {});
      }
    }

    return () => {};
  }, []);

  return (
    <>
      {userType === 0 ? (
        <RegularUserProfile />
      ) : userType === 1 ? (
        <HustlerProfile />
      ) : (
        <>
          <Grid container spacing={4} style={{ paddingTop: "10px" }}>
            <Grid item xs={12}>
              <Skeleton variant="text" width={"100%"} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="circular" width={"100%"} height={"100%"} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" width={"100%"} height={"100px"} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" width={"100%"} height={"100px"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={"100%"} height={"100px"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={"100%"} height={"40px"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={"100%"} height={"100px"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={"100%"} height={"40px"} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Profile;
