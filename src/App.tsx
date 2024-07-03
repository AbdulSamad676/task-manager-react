// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { routesConfig } from '../routs/root.js';
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1 className='text-3xl font-bold underline'>Hello world!</h1> */}
      <Routes>
        {routesConfig.map((route: any) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <route.layout title={route.path}>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
