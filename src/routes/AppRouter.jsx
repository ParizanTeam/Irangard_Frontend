import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
import NotFoundPage from "../components/NotFoundPage";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />}/> */}
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
