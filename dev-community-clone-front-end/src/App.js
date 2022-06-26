import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import MainBar from './components/MainBar/MainBar';
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import LoginPage from "./components/LoginPage/LoginPage";
import IntroCard from './components/IntroCard/IntroCard';
import SignupPage from './components/SignupPage/SignupPage';

function App() {
  return (
    <>
      <Router>
        <MainBar />
        <Main />
        <Routes>
          <Route path="/" element={<IntroCard />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignupPage />}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
