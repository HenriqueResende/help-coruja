import HomeScreen from "./component/Home";
import Login from "./component/Login";
import {TokenProvider} from "./context/tokenContext";

export default function App() {
  return (
    <TokenProvider>
      <Login/>
    </TokenProvider>
  );
}
