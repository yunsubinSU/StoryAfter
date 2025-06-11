import React from 'react';
import '../../css/user/ReviewOne.css';

export default function MovieReviewSection() {
    return (
        <div className="movie-review-container">
          <h1 className="section-title">영화 리뷰</h1>

          <div className="review-box">
            <img  className='backgroundimg' src='data:image/jpeg;base64,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'/>
            <div className="over">
                <div className='left-panel'>
                    <h2 className="movie-title23">릴로&스티치</h2>
                    <button className="review-button">리뷰 남기러 가기</button>
                </div>
    
                <div className="card-panel">
                
                    <div  className="review-card">
                        <a>User1</a><br/>
                        <a>영화가 진짜 재미있었어요</a>
                    </div>
                    <div  className="review-card">
                        <a>User2</a><br/>
                        <a>스티치가 짱 귀여워요</a>
                    </div>
                    <div  className="review-card">
                        <a>User3</a><br/>
                        <a>한마리 입양 각입니다!</a>
                    </div>

                    
                </div> 
            </div>
          </div>
        </div>    
      );
      
    }
