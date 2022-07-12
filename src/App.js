import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Auth 2.0 Authentication</p>
        {!isAuthenticated && (
          <button onClick={loginWithPopup}>Login with Popup</button>
        )}
        {!isAuthenticated && (
          <button onClick={loginWithRedirect}>Login with Redirect</button>
        )}
        
        {isAuthenticated && (
          <pre style={{ textAlign: "center" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        )}
        {isAuthenticated && <button onClick={logout}>Logout</button>}
      </header>
    </div>
  );
}

export default App;
