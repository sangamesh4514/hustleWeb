import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegularUserProfile from "./RegularUserProfile";
import HustlerProfile from "./HustlerProfile";

const Profile = () => {
  const [user, setUser] = useState({
    type: 0,
    name: "user",
    rating: 3,
    details:
      "Equipped to handle all types of problems. Providing excellent service at resonable prices",
  });
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`../../register/${1}`);
  };

  const editUser = () => {
    navigate("../../edit/user/67");
  };

  const editHustler = () => {
    navigate("../../edit/hustler/67");
  };

  return (
    <>
      {user.type ? (
        <RegularUserProfile
          user={user}
          setUser={setUser}
          handleRegister={handleRegister}
          editUser={editUser}
        />
      ) : (
        <HustlerProfile
          user={user}
          setUser={setUser}
          editHustler={editHustler}
        />
      )}
    </>
  );
};

export default Profile;
