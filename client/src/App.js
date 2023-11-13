import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components";
import AppRouters from "./routes/app.routes";
// import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container ">
          <AppRouters />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
