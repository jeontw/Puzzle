// src/saveScore.js

import { db } from './firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * 사용자 점수를 Firestore 'scores' 컬렉션에 저장하는 함수
 */
export const saveScore = async (username, timeInSeconds, level) => {
  if (!timeInSeconds || timeInSeconds <= 0 || username.trim() === "") {
      console.error("유효하지 않은 데이터이므로 DB 저장을 건너뜁니다.");
      return;
  }
  
  try {
    await addDoc(collection(db, "scores"), {
      username: username,
      time: timeInSeconds, 
      level: level,
      timestamp: serverTimestamp() 
    });
    
    console.log("✅ Firestore에 점수 저장 성공. 이름:", username);
  } catch (e) {
    console.error("❌ Firestore 점수 저장 오류: ", e);
  }
};