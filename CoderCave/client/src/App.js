import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange } from './managers/authManager';
import ApplicationViews from './components/ApplicationViews';
import { TagProvider } from './providers/TagProvider';
import { InquireProvider } from './providers/InquireProvider';
import { SearchProvider } from './providers/SearchProvider';
import Header from './components/Header';
import { UserContext } from './providers/UserProvider';
import { AnswerProvider } from './providers/AnswerProvider';
import { CommentProvider } from './providers/CommentProvider';
import { getAuth } from 'firebase/auth';

function App() {

  let uid

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  if (isLoggedIn) uid = getAuth().currentUser.uid

  const [currentUser, setCurrentUser] = useState({});

  const { getCurrentUser } = useContext(UserContext); 
  
  useEffect(() => {
    
    onLoginStatusChange(setIsLoggedIn);

    if (uid) {
      getCurrentUser(uid)
        .then(setCurrentUser);
    }
  }, [uid, getCurrentUser]);

  if (isLoggedIn === null) {
    return <Spinner color="dark" type="grow" >Loading ...</Spinner>;
  }

  return (
    <TagProvider>
      <InquireProvider>
        <SearchProvider>
          <AnswerProvider>
            <CommentProvider>
              <Header isLoggedIn={isLoggedIn} isAdmin={currentUser.userType?.type === "Admin"} />
              <ApplicationViews isLoggedIn={isLoggedIn} isAdmin={currentUser.userType?.type === "Admin"} />
            </CommentProvider>
          </AnswerProvider>
        </SearchProvider>
      </InquireProvider>
    </TagProvider>
  );

}

export default App;
