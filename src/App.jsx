import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DiscoverFood from './pages/DiscoverFood';
import FoodDetails from './pages/FoodDetails';
import AddSurplus from './pages/AddSurplus';
import EditSurplus from './pages/EditSurplus';
import MyListings from './pages/MyListings';
import RescueFlow from './pages/RescueFlow';
import Impact from './pages/Impact';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="discover" element={<DiscoverFood />} />
        <Route path="food/:id" element={<FoodDetails />} />
        <Route path="add-surplus" element={<AddSurplus />} />
        <Route path="edit-food/:id" element={<EditSurplus />} />
        <Route path="my-listings" element={<MyListings />} />
        <Route path="rescue/:id" element={<RescueFlow />} />
        <Route path="impact" element={<Impact />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
