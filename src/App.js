import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";



function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Auth 2.0 Authentication</p>
        <p>
					Electron v0.1.5
				</p>
        {!isAuthenticated && (
          <button onClick={loginWithRedirect}>Login with Redirect</button>
        )}
        { isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
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
