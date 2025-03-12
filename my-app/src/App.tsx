import Auth from "./components/Auth";
import Tasks from "./components/Tasks";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/authentication" element={<Auth />} />
    </Routes>
  );
};

export default App;
