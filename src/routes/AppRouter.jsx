import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import NotFoundPage from 'src/components/NotFoundPage';
import AddPlaces from 'src/components/AddPlaces';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/add-new-places" element={<AddPlaces />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
