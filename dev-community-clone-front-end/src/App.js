import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import LoginPage from "./components/LoginPage/LoginPage";
import BasicCard from "./components/BasicCard/BasicCard";

function App() {
  return (
    <>
      <Router>
        <ButtonAppBar />
        <Main />
        <Routes>
          <Route path="/" element={<BasicCard />} />
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
