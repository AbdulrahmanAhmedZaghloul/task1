import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import SingleHome from './components/SingleHome/SingleHome';
import { Provider } from 'react-redux';
import store from './lip/store';
import { HelmetProvider } from 'react-helmet-async';
import Erorr from './components/Erorr/Erorr';

let routering = createHashRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'singleHome/user/:id', element: <SingleHome /> },
      { path: '*', element: <Erorr /> },

    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={routering}>
        </RouterProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
