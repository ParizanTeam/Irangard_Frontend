import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
import NotFoundPage from "../components/NotFoundPage";
import Login from "../components/LoginModal";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="*" element={<NotFoundPage />}/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
