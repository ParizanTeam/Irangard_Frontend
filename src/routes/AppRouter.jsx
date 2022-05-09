import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import NotFoundPage from 'src/components/NotFoundPage';
import Profile from 'src/components/Profile';
import PlaceDetailPage from '../components/places/PlaceDetailPage';

import AddPlaces from 'src/components/AddPlaces';
import PlaceFilters from 'src/components/PlaceFilters';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/places/:placeId" element={<PlaceDetailPage />} />
        <Route path="/add-new-places"x element={<AddPlaces />} />
        <Route path="/Search"x element={<PlaceFilters />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
