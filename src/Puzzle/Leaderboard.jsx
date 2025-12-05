import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, query, orderBy, limit, where, getDocs } from "firebase/firestore";

function Leaderboard({ level }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); 


  const fetchLeaderboard = async () => { 
    if (!level || level < 3 || level > 5) return; 

    setLoading(true);

    console.log(`[DB 조회 시작] Level: ${level} (${typeof level}), RefreshKey: ${refreshKey}`);

    
    try {
      const q = query(
        collection(db, "scores"), 
        where("level", "==", Number(level)), 
        orderBy("time", "asc"),
        limit(10)
      );
      
      const querySnapshot = await getDocs(q);
      const scores = [];
      
      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() });
      });
      
      setLeaderboard(scores);


      console.log(`[DB 조회 성공] Level ${level}에서 총 ${scores.length}개의 기록을 불러왔습니다.`);

      
    } catch (error) {
      console.error("[DB 조회 오류 발생]:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [level, refreshKey]); 

  const handleRefresh = () => {
      setRefreshKey(prevKey => prevKey + 1); 
  };
  
  return (
    <div className="랭킹" style={{marginTop: '20px'}}>
        <div style={{ padding: '5px', fontWeight: 'bold' }}>
            {level}x{level} 👑 GLOBAL TOP 10 (FIREBASE)
            <button onClick={handleRefresh} disabled={loading}>
                {loading ? '로딩 중...' : '새로고침'}
            </button>
        </div>
        {loading ? (
            <div style={{ padding: '50px', color: 'yellow' }}>
                Firestore 랭킹을 불러오는 중...
            </div>
        ) : leaderboard.length === 0 ? (
             <div style={{ padding: '50px', color: 'gray' }}>
                아직 등록된 글로벌 랭킹 기록이 없습니다.
            </div>
        ) : (
             <ol style={{ padding: 0, listStyle: 'none' }}>
                {leaderboard.map((score, idx) => (
                    <li 
                      className="나의기록" 
                      key={score.id} 
                      style={{ 
                          backgroundColor: idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'sandybrown' : 'antiquewhite',
                          fontWeight: idx < 3 ? 'bold' : 'normal'
                      }}>
                        <div>{idx + 1}등</div>
                        <div>{score.level}X{score.level}</div>
                        <div>{score.time.toFixed(1)}s</div> 
                        <div>{score.username || "익명"}</div>
                        <div>DB 등록</div>
                    </li>
                ))}
             </ol>
        )}
    </div>
  );
}

export default Leaderboard;