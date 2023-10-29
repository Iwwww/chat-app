import { BrowserRouter } from "react-router-dom";
import AppRouters from "./routes/app.routes";
// import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;
