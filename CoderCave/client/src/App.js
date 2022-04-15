import React, { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange } from './managers/authManager';
import ApplicationViews from './components/ApplicationViews';
import { TagProvider } from './providers/TagProvider';
import { InquireProvider } from './providers/InquireProvider';
import { SearchProvider } from './providers/SearchProvider';
import Header from './components/Header';
import { AnswerProvider } from './providers/AnswerProvider';
import { CommentProvider } from './providers/CommentProvider';

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
        <SearchProvider>
          <AnswerProvider>
            <CommentProvider>
              <Header isLoggedIn={isLoggedIn} />
              <ApplicationViews isLoggedIn={isLoggedIn} />
            </CommentProvider>
          </AnswerProvider>
        </SearchProvider>
      </InquireProvider>
    </TagProvider>
  );

}

export default App;
