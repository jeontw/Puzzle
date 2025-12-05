// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: YOUR_... 부분을 사용자님의 실제 파이어베이스 설정 정보로 반드시 교체해야 합니다.
const firebaseConfig = {
  apiKey: "AIzaSyA8aMO88Ij7pymgbRMWI4L7zKFIx9ilqVM",
  authDomain: "slidingpuzzle-5ef8f.firebaseapp.com",
  projectId: "slidingpuzzle-5ef8f",
  storageBucket: "slidingpuzzle-5ef8f.firebasestorage.app",
  messagingSenderId: "916198353830",
  appId: "1:916198353830:web:d8a1490e2afc4d1e4efd67",
  measurementId: "G-ES0TJ7W1QY"
};

// 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기 (DB에 접근할 때 사용할 객체)
export const db = getFirestore(app);