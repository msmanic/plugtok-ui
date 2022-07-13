import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import Profile from 'pages/Profile';

const Routes = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Switch>
);

export default Routes;
