import React from 'react'
import useFetch from '../../../hooks/useFetch'
import CarouselSlide from '../../../components/carouselSlide/CarouselSlide'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
function Similar({ mediaType, id }) {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)
    return (
        <div className='similar'>
            <ContentWrapper style={{ marginBottom: '25px' }}>
                <span style={{ fontSize: '24px', color: '#fff' }}>Similar</span>
            </ContentWrapper>
            <CarouselSlide data={data} loading={loading} mediaType={mediaType} />
        </div>
    )
}

export default Similar