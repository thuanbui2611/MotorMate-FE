import { useHistory, useLocation } from "react-router-dom";

export default function ServerErrors() {
  const history = useHistory();
  const { state } = useLocation<any>();
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
        <a href="/home"> Go Back To Homepage</a>
        {/* <button onClick={() => history.push('/products')}>Go back</button> */}
      </div>
    </>
  );
}
