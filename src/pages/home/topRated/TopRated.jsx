import React, { useState } from 'react'
import '../trending/Trending.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTabs/SwitchTab'
import useFetch from '../../../hooks/useFetch'
import CarouselSlide from '../../../components/carouselSlide/CarouselSlide'
function TopRated() {

    const [endPoint, setEndPoint] = useState('movie')
    const { data, loading } = useFetch(`/${endPoint}/top_rated`)

    const onTabChange = (tab) => {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv')
    }

    return (
        <div className='carouselSelection'>

            <ContentWrapper>
                <span className='carouselTitle'>TopRated</span>
                <SwitchTab data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <CarouselSlide data={data} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default TopRated