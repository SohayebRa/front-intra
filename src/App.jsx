// APP Component
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { IntraProvider } from "./context/IntraContext";
import Home from "./views/Home";
import List from "./views/List";
import Login from "./views/Login";
import Add from "./views/Add";
import Edit from "./views/edit";

function App() {
  return (
    <BrowserRouter>
      <IntraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="list" element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Edit />} />
        </Routes>
      </IntraProvider>
    </BrowserRouter>
  );
}

export default App;
