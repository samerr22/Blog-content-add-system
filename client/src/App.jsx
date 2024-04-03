import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import Cont from "./pages/ContDetails";
import Updatecont from "./pages/Updatecontent";
import Viewfeed from "./pages/Viewfeed";
import Dash from "./components/DashProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contdetails/:contenId" element={<Cont />} />

        <Route element={<PrivateRoute />}>
        <Route path="/dash" element={<Dash />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-cont/:contId" element={<Updatecont />} />
          <Route path="/View" element={<Viewfeed />} />
          
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
