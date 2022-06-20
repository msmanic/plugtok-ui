import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import Profile from 'pages/Profile';

const Routes = () => (
  <Switch>
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<Navigate to="/profile" replace />} />
  </Switch>
);

export default Routes;
