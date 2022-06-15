import { BrowserRouter } from 'react-router-dom';
import AppLayout from 'layouts';
import Routes from 'Routes';

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
