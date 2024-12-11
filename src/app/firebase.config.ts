// src/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../firebase.config';

const firebaseApp = initializeApp(environment.firebase);
export const firestore = getFirestore(firebaseApp);


