import { Outlet, useParams } from "react-router-dom";
import HeaderProfile from "../../app/components/HeaderProfile";
import { useEffect, useState } from "react";
import { UserDetail } from "../../app/models/User";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/components/Loading";
import ProfileDetails from "../../app/components/ProfileDetails";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { getProfileByUsernameAsync } from "./ProfileSlice";

export default function Profile() {
  const { profileUserLoaded, profileUser } = useAppSelector(
    (state) => state.profile
  );
  const { username } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    //Fetch user
    if (username && profileUser?.username !== username) {
      dispatch(getProfileByUsernameAsync(username));
    }
  }, [username]);

  if (profileUserLoaded) {
    return <Loading />;
  } else if (profileUser?.username !== username?.toLowerCase())
    return <NotFound />;
  return (
    <>
      <HeaderProfile userDetail={profileUser} />
      {/* <ProfileDetails/> */}
      <Outlet />
    </>
  );
}
