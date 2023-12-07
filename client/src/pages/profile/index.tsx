import { Outlet, useParams } from "react-router-dom";
import HeaderProfile from "../../app/components/HeaderProfile";
import { useEffect } from "react";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/components/Loading";
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
  } else if (profileUser?.username.toLowerCase() !== username?.toLowerCase())
    return <NotFound />;
  return (
    <>
      <HeaderProfile profileUser={profileUser} />
      <Outlet />
    </>
  );
}
