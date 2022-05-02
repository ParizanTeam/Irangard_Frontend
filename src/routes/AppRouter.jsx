import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import NotFoundPage from 'src/components/NotFoundPage';
import Profile from 'src/components/Profile';
import PlaceDetailPage from '../components/places/PlaceDetailPage';
import ForgetPassword from 'src/components/LoginModal/ForgetPassword';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/places/:placeId" element={<PlaceDetailPage />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
