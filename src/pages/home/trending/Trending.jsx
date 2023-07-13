import React, { useState } from 'react'
import './Trending.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTabs/SwitchTab'
import useFetch from '../../../hooks/useFetch'
import CarouselSlide from '../../../components/carouselSlide/CarouselSlide'
function Trending() {

    const [endPoint, setEndPoint] = useState('day')

    const { data, loading } = useFetch(`/trending/movie/${endPoint}`)

    const onTabChange = (tab) => {
        setEndPoint(tab === 'Day' ? 'day' : 'week')
    }

    return (
        <div className='carouselSelection'>

            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
            </ContentWrapper>
            <CarouselSlide data={data} loading={loading} />
        </div>
    )
}

export default Trending