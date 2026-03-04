import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import RoomSelection from "./components/RoomSelection";
import PromptSelection from "./components/PromptSelection";
import DesignView from "./components/DesignView";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/room" element={<RoomSelection />} />
            <Route path="/prompt" element={<PromptSelection />} />
            <Route path="/design" element={<DesignView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
