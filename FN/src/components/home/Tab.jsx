import '../../css/home/Tab.css';
import { useState } from 'react';
import beanimg from '../../img/beanimg.png';


function Tab(){
    const [tab, setTab] = useState(1);

    const dummyReviews = [
        { id: 1, nickname: 'HOTCHO', content: '저런 장면은 소장이 하고 싶을 정도입니다.', date: '2025/02/03' },
        { id: 2, nickname: 'HOTGUY', content: '내용 진짜 재미있는데 다들 보세요', date: '2025/02/03' },
        { id: 3, nickname: 'TOTO', content: '진짜 배우가 한 몫했다. 라인업봐봐요', date: '2025/02/03' },
        { id: 4, nickname: 'TOPERM', content: '후속작있겠죠??? 없는거 아니죠??', date: '2025/02/03' },
        { id: 5, nickname: 'SIAME', content: '내 인생에 있어서 이런 영화를 지금에야 봤어요 그만큼 인생작', date: '2025/02/03' },
        { id: 6, nickname: 'ZHFLDK', content: '난 재미없었는데 그냥 캐릭터 자체가 귀여워서 두번 보고 한번보고', date: '2025/02/03' },
    ];


    const REVIEWS_PER_PAGE = 4;
    const [page, setPage] = useState(0);
    
    const pages   = Math.ceil(dummyReviews.length / REVIEWS_PER_PAGE);
    const current = dummyReviews.slice(
    page * REVIEWS_PER_PAGE,
    (page + 1) * REVIEWS_PER_PAGE
    );

    return(
        <div id="tab">
            <div id='tab-btn'>
                <button onClick={()=>setTab(1)}>채팅방</button>
                <button onClick={()=>setTab(2)}>문의사항</button>
                <button onClick={()=>setTab(3)}>공지사항</button>
            </div>
            <div id='tab-content'>
                {
                    tab === 1 ? 
                    <div id='chatroom'>
                        <div className='chatroom1'>
                            <img src={beanimg} alt='icon' className='BeanImg'></img>
                            <h3 className='chattitle1'>대구채팅방</h3>
                            <a className='chatting1'>참여인원수:2/4</a>
                            <a>개선일:2025/06/09</a>
                        </div>   

                        <div className='chatroom2'>
                            <img src={beanimg} alt='icon' className='BeanImg'></img>
                            <h3 className='chattitle2'>서울채팅방</h3>
                            <a className='chatting2'>참여인원수:2/4</a>
                            <a>개선일:2025/06/09</a>
                        </div>  

                        <div className='chatroom3'>
                            <img src={beanimg} alt='icon' className='BeanImg'></img>
                            <h3 className='chattitle3'>부산채팅방</h3>
                            <a className='chatting3'>참여인원수:2/4</a>
                            <a>개선일:2025/06/09</a>
                        </div>  

                    </div>:''
                }

                {
                    tab === 2 ? 
                    <div  id='inquiry'>      
                        <div className="Inauiryconnect">
                            <h3>
                                문의사항
                            </h3>
                            {current.map(r => (
                                <div className="inquiryBox" key={r.id}>
                                <div className="inquirysmallBox">
                                    <strong className="nickname12">{r.nickname}</strong>
                                </div>
                                <div className="InquiryContent">{r.content}</div>
                                <div className="InquiryDate">{r.date}</div>
                                </div>
                            ))}

                            {/* Prev / Next 버튼 (4개 이상일 때만) */}
                            {pages > 1 && (
                                <div className="InquiryPager">
                                <button
                                    onClick={() => setPage(p => p - 1)}
                                    disabled={page === 0}
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={page === pages - 1}
                                >
                                    Next
                                </button>
                                </div>
                            )}
                            </div>
                    </div>:''
                }
                                {
                    tab === 3 ? 
                    <div  id='gallery'>
                        <div className="galleryconnect">
                            <h3>
                                공지사항
                            </h3>
                            {current.map(r => (
                                <div className="galleryBox" key={r.id}>
                                <div className="gallerysmallBox">
                                    <strong className="nickname12">{r.nickname}</strong>
                                </div>
                                <div className="galleryContent">{r.content}</div>
                                <div className="galleryDate">{r.date}</div>
                                </div>
                            ))}

                            {/* Prev / Next 버튼 (4개 이상일 때만) */}
                            {pages > 1 && (
                                <div className="galleryPager">
                                <button
                                    onClick={() => setPage(p => p - 1)}
                                    disabled={page === 0}
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={page === pages - 1}
                                >
                                    Next
                                </button>
                                </div>
                            )}
                        </div>
                    </div>:''
                                }
                            </div>
                        </div>
                    )
}

export default Tab;