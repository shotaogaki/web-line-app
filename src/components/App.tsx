import React from 'react'; 
import firebase from 'firebase/app';
import 'firebase/firestore';
import config from '../config/firebase-config';
import Header from "./Header";
import Main  from './Main';

function App() {
  firebase.initializeApp(config);
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}
export default App;