import React, { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange } from './managers/authManager';
import ApplicationViews from './components/ApplicationViews';
import { TagProvider } from './providers/TagProvider';
import { InquireProvider } from './providers/InquireProvider';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner color="dark" type="grow" >Loading ...</Spinner>;
  }

  return (
    <TagProvider>
      <InquireProvider>
        {/* <Header /> */}
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </InquireProvider>
    </TagProvider>
  );

}

export default App;
