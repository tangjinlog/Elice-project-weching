// dependencies
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AdminButton } from '../AdminCheck/AdminCheck';

// styles
import * as S from './styled';

interface RankingInfoType {
  rank: number,
  user_id: number,
  nickname: string,
  grade: number,
  avg: number,
}

const initialState: RankingInfoType[] = [
  {
    "rank": 1,
    "user_id": 20,
    "nickname": "테스트1",
    "grade": 99,
    "avg": 4.95
  },
  {
    "rank": 2,
    "user_id": 30,
    "nickname": "테스트2",
    "grade": 90,
    "avg": 4.80
  },
  {
    "rank": 3,
    "user_id": 40,
    "nickname": "테스트3",
    "grade": 85,
    "avg": 4.11
  },
]

export const Ranking = () => {
  const navigate = useNavigate();

  const [rankInfo, setRankInfo] = useState<RankingInfoType[]>(initialState);

  const rankingInfo = async () => {
    try { 
      const {ranking}: {ranking: RankingInfoType[]} = await axios.get(`/api/main`,
      ).then(res => res.data)
      setRankInfo(ranking);

    } catch (err) {
      alert(`예기지 못한 에러가 발생했습니다.\nERROR: ${err}`);
    }
  };
  useEffect(() => {
    rankingInfo();
  }, []);

  return (
    <>
      <S.Ranking>
        <div className='container'>
          <S.RankingTitle>이 달의 칭찬왕</S.RankingTitle>
          <AdminButton />
          <S.RankingDetailButton onClick={() => navigate('/home/ranking')}>
            더보기
          </S.RankingDetailButton>
        </div>
        {
          Array.isArray(rankInfo) && rankInfo.length > 0 ? 
          rankInfo.slice(0,5).map((item: RankingInfoType)=>
            <S.RankingUser rank={item.rank}>
              <div className='rank'>
                <S.Image className='rankImg' src={`/rank/ranking${item.rank}.png`} alt=''/>
                <div className='rankContent'>
                  <strong>{item.rank}등</strong> - {item.nickname} &ensp;<strong>RP</strong> - {item.avg}
                </div>
              </div>
            </S.RankingUser>
          ) : null 
        }
      </S.Ranking>
    </>
  );
};
