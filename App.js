import HomeScreen from "./component/Home";
import Login from "./component/Login";
import {TokenProvider} from "./context/tokenContext";
import { AulaProvider } from "./context/aulaContext";

export default function App() {
  return (
    <TokenProvider>
      <AulaProvider>
        <Login/>
      </AulaProvider>
    </TokenProvider>
  );
}
