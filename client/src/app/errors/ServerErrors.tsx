import { useLocation, useNavigate } from "react-router-dom";

export default function ServerErrors() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <>
      {state?.error ? (
        <div>
          <h1> Server Error</h1>
          <h2>{state.error.detail || "Internal server error"}</h2>
        </div>
      ) : (
        <div>
          {" "}
          <h1>Server Error</h1>
        </div>
      )}
      <div>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
}
