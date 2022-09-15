import { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { getGeocode } from "use-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Button from "../common/Button";
import { Grid } from "@mui/material";
import { editUser, editHustler } from "../slices/profileSlice";
import Loader from "../common/Loader";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [center, setCenter] = useState(null);
  const userId = localStorage.getItem("userId");
  const type = Number(localStorage.getItem("userType"));
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          const { latitude, longitude } = res.coords;
          setCenter({ lat: latitude, lng: longitude });
          console.log(res);
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
    }

    return () => {};
  }, []);

  const handleBoundsChanged = async () => {
    const lat = mapRef.current.state.map.center.lat();
    const lng = mapRef.current.state.map.center.lng();

    const results = await getGeocode({ location: { lat, lng } });
    console.log(lat, lng, results);
    let max = 0;
    let maxIndex;
    for (let i = 0; i < results.length; i++) {
      if (results[i].address_components.length >= max) {
        max = results[i].address_components.length;
        maxIndex = i;
      }
    }
    console.log(maxIndex, max);
    if (results[maxIndex || 0].formatted_address[0] == "X") {
      const temp = results[maxIndex].formatted_address.split(",");
      let a = "";
      for (let i = 1; i < temp.length; i++) {
        a = a + temp[i];
      }
      setLocation(a);
    } else {
      setLocation(results[maxIndex || 0].formatted_address);
    }
    //mapRef.current.panTo({ lat, lng });
    //setCenter({ lat, lng });
  };
  const currentLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          const { latitude, longitude } = res.coords;
          console.log(latitude, longitude);
          setCenter({ lat: latitude, lng: longitude });
          handleBoundsChanged();
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
    }
  };
  //console.log(mapRef.current);
  const handleSubmit = () => {
    setLoader(true);
    const lat = mapRef.current.state.map.center.lat();
    const lng = mapRef.current.state.map.center.lng();

    if (type === 0) {
      dispatch(
        editUser({
          userId,
          data: {
            location: {
              coordinates: [lat, lng],
              type: "Point",
              name: location,
            },
          },
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          navigate("/home");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    } else if (type === 1) {
      dispatch(
        editHustler({
          userId,
          data: {
            location: {
              coordinates: [lat, lng],
              type: "Point",
              name: location,
            },
          },
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          navigate("/home");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
    //navigate("/home");
  };

  return (
    <>
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px",
            position: "absolute",
            left: "0px",
            zIndex: "20",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1}>
              <ArrowBackIosIcon
                style={{
                  fontSize: "22px",
                  paddingLeft: "10px",
                  paddingTop: "5px",
                }}
                onClick={() => {
                  navigate(-1);
                }}
              />
            </Grid>
            <Grid item xs={11} style={{ paddingLeft: "10px" }}>
              <span style={{ fontSize: "20px", fontFamily: "Roboto" }}>
                Choose your location
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {center && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100vh", margin: 0 }}
              center={center}
              options={options}
              zoom={20}
              ref={mapRef}
              onDragEnd={handleBoundsChanged}
              onLoad={handleBoundsChanged}
              //onUnmount={onUnmount}
            >
              <div
                style={{
                  position: "absolute",
                  /*url of the marker*/
                  background:
                    "url(http://maps.gstatic.com/mapfiles/markers2/marker.png) no-repeat",
                  /*center the marker*/
                  top: "50%",
                  left: "50%",
                  zIndex: "11",
                  /*fix offset when needed*/
                  marginLeft: "-10px",
                  marginTop: "-34px",
                  /*size of the image*/
                  height: "34px",
                  width: "20px",
                  cursor: "pointer",
                }}
              ></div>
              {/* <div
                style={{
                  position: "absolute",
                  
                  bottom: "20%",
                  right: "5%",
                  zIndex: "11",
                 
                  marginLeft: "-10px",
                  marginTop: "-34px",
                 
                  height: "34px",
                  width: "20px",
                  cursor: "pointer",
                }}
              >
                <MyLocationRoundedIcon
                  onClick={currentLocation}
                  style={{ fontSize: "30px", color: "green" }}
                />
              </div> */}
            </GoogleMap>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "10px",
            position: "absolute",
            bottom: "0px",
            zIndex: "20",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          {" "}
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <RoomOutlinedIcon style={{ fontSize: "30px" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span style={{ fontSize: "15px" }}>{location}</span>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                value={"Confirm location"}
                style={{ backgroundColor: "green" }}
                fullWidth
                onClick={handleSubmit}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Loader open={loader} />
    </>
  );
};

export default Map;
