import React, { useState } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
function VideoSection({ video, videoLoading }) {
    const [videoKey, setVideoKey] = useState(null)

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    }

    return (
        <div className='videoSection'>
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!videoLoading ? (
                    <div className='videos'>
                        {video?.map((item) => (
                            <div key={item?.id} className='videoItem'>
                                <div className='videoThumbnail'>
                                    <Img src={`https://img.youtube.com/vi/${item?.key}/mqdefault.jpg`} />
                                </div>

                                <span className='videoTitle'>
                                    {item?.name}
                                </span>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default VideoSection