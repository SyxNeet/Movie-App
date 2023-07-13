import React from 'react'
import useFetch from '../../../hooks/useFetch'
import CarouselSlide from '../../../components/carouselSlide/CarouselSlide'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
function Recomendation({ mediaType, id }) {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <div className='recommendation'>
            <ContentWrapper style={{ marginBottom: '25px' }}>
                <span style={{ fontSize: '24px', color: '#fff', marginBottom: '25px' }}>Recommendation</span>
            </ContentWrapper>
            <CarouselSlide data={data} loading={loading} mediaType={mediaType} />
        </div>
    )
}

export default Recomendation