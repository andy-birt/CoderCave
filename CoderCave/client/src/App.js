import React, { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange } from './managers/authManager';
import ApplicationViews from './components/ApplicationViews';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner color="dark" type="grow" >Loading ...</Spinner>;
  }

  return (
    <>
      {/* <Header /> */}
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </>
  );

}

export default App;
