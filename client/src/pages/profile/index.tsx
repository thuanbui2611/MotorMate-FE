import { Outlet, OutletProps, useParams } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
import { useEffect, useState } from "react";
import { UserDetail } from "../../app/models/User";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/components/Loading";
import ProfileDetails from "./ProfileDetails";
import agent from "../../app/api/agent";

export default function Profile() {
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    //Fetch user
    if (username) {
      agent.Account.getDetailsByUserName(username)
        .then((user) => setUserDetail(user))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else if (!userDetail) return <NotFound />;
  return (
    <>
      <HeaderProfile userDetail={userDetail} />
      <ProfileDetails userDetail={userDetail} />
    </>
  );
}
