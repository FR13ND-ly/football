import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTLwg1gIMKtT4UWD8CzS4YqBB_aKHefDk",
  authDomain: "fotbal-b6f96.firebaseapp.com",
  databaseURL: "https://fotbal-b6f96-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fotbal-b6f96",
  storageBucket: "fotbal-b6f96.firebasestorage.app",
  messagingSenderId: "1051342037485",
  appId: "1:1051342037485:web:cc1643d3f7bbb63ea547e4"
};

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
