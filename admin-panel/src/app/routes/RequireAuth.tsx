import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { signOut } from "../../pages/account/AccountSlice";

interface Props {
  roles?: string[];
}
export default function RequireAuth({ roles }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      toast.error("You need to login to access this page");
      navigate("/login");
    } else if (roles && !roles.some((r) => user.role?.includes(r))) {
      toast.error("You don't have permission to access this page");
      dispatch(signOut());
      navigate("/login");
    }
  }, [user, navigate, location, roles]);

  if (!user) {
    return null;
  }

  return <Outlet />;
}
