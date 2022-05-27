import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import NotFoundPage from 'src/components/NotFoundPage';
import Profile from 'src/components/Profile';
import AddExperience from '../components/AddExperience';
import ExperienceDetail from '../components/ExperienceDetail';
import Experiences from '../components/Experiences';
import Feed from '../components/Feed';
import PlaceDetailPage from '../components/places/PlaceDetailPage';
import ForgetPassword from 'src/components/LoginModal/ForgetPassword';
import AddTour from 'src/components/Tours/AddTour';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/places/:placeId" element={<PlaceDetailPage />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/new" element={<AddExperience />} />
        <Route path="/experiences/:id" element={<ExperienceDetail />} />
        <Route path="/tours/new" element={<AddTour />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
