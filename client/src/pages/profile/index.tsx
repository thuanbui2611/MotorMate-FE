import { Outlet, useParams } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
import { useEffect, useState } from "react";
import { UserDetail } from "../../app/models/User";
import agentTest from "../../app/api/agentTest";

export default function Profile() {
  const [user, setUser] = useState<UserDetail>();
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  useEffect(() => {
    //Fetch user
    if (username) {
      agentTest.Account.getDetailsByUserName(username)
        .then((user) => setUser(user))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <>
      <HeaderProfile user={user} />
      <Outlet />
    </>
  );
}
