import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import NotFoundPage from 'src/components/NotFoundPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
