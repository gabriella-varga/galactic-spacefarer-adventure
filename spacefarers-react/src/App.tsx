import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Create from "./pages/Create";
import { Edit } from "./pages/Edit";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
