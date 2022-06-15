import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import Home from 'pages/Home';

const Routes = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Switch>
);

export default Routes;
