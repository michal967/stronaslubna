import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingPage from "./pages/WeddingPage";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeddingPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

export default App;