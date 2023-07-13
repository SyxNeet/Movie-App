import React, { useEffect, useState } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'
import { Rate } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import VideoPopup from '../../../components/videoPopUp/VideoPopup'
function DetailBanner({ data, video }) {

    const [videoId, setVideoId] = useState(null)
    const [showModalPlay, setShowModalPlay] = useState(false)

    const [backGround, setBackGround] = useState('')
    const { url } = useSelector(state => state.home)

    useEffect(() => {
        const bg = url.backdrop +
            data?.backdrop_path
        setBackGround(bg)
    }, [data])


    return (
        <div className='detailBanner'>

            <div className='imgBanner'
                style={{
                    backgroundImage: `url(${backGround})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className='container'>
                    <ContentWrapper>
                        <div className='contentContainer'>
                            <div className="left-content">
                                <img src={backGround} alt="" />
                            </div>
                            <div className="right-content">
                                <h3 className="title">{data?.title} ({data?.tagline})</h3>
                                <div className='facts'>

                                    <span className='certification'>PG</span>
                                    <span className='release'>{data?.release_date}</span>
                                    <div className='genres'>
                                        {data?.genres?.map((g, index) => (
                                            <span key={index}>{g?.name}</span>
                                        ))}
                                    </div>
                                    <span className='runtime'>{data?.runtime}p</span>
                                </div>
                                <Rate disabled defaultValue={(Math.floor((data?.vote_average) / 2) + 1)} />
                                <div className='playtrailerVd' onClick={() => {
                                    setVideoId(video?.key)
                                    setShowModalPlay(true)
                                }}>
                                    <PlayCircleOutlined />
                                </div>
                                <div className="overview">
                                    <span className="titleOverview">OverView</span>
                                    <span className="description">{data?.overview}</span>
                                </div>
                                <div className="listInfomation">
                                    <div className="info">

                                        {data?.production_companies?.map((i, index) => (
                                            <span key={index}>{i?.name}</span>

                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <VideoPopup
                            videoId={videoId}
                            setVideoId={setVideoId}
                            showModalPlay={showModalPlay}
                            setShowModalPlay={setShowModalPlay}
                        />
                    </ContentWrapper>
                </div>
            </div>
        </div>
    )
}

export default DetailBanner