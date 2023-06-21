
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/AccountProvider";
import SearchProvider from "./context/SearchProvider";
import Message from "./components/Message/Message";
import Login from "./components/Login/Login";
import LoginBox from "./components/Login Box/LoginBox";

export default function App() {
  const clientId = '978784189066-5eutunn9o213qq4jh678gag09ijijbav.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <SearchProvider>
          <LoginBox />
          <Login />
          <Message />
        </SearchProvider>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}
