import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppSelector } from "../store/ConfigureStore";

interface Props {
  roles?: string[];
}
export default function RequireAuth({ roles }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error("You need to login to access this page");
      navigate("/login");
    } else if (roles && !roles.some((role) => user.role?.includes(role))) {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [user, navigate, location, roles]);

  if (!user) {
    return null;
  }

  return <Outlet />;
}
