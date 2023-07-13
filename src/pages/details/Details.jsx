import React from 'react'
import './Detail.scss'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'
import Recomendation from './recomendation/Recomendation'
import Similar from './similar/Similar'
function Details() {

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { data: video, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)

    return (
        <div className='detail'>
            <DetailBanner data={data} video={video?.results?.[0]} loading={loading} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideoSection video={video?.results} loading={videoLoading} />
            <Recomendation mediaType={mediaType} id={id} />
            <Similar mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
