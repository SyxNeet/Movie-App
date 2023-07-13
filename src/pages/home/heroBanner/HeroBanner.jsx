import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import './HeroBanner.scss'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'



function HeroBanner() {
    const [backGround, setBackGround] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const { url } = useSelector(state => state.home)



    const { loading, data } = useFetch('/movie/upcoming')
    useEffect(() => {
        const bg = url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackGround(bg)
    }, [data])

    const hanldeSearch = (event) => {
        if (event.key === 'Enter' && searchTerm.length > 0) {
            navigate(`/search/${searchTerm}`)
        }
    }


    return (
        <div className='heroBanner'>
            {
                !loading &&
                <div className='backdrop-img'>
                    <Img src={backGround} />
                </div>
            }

            <div className='opacity'></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className='title'>WelCome.</span>
                    <span className='subTitle'>
                        Miliions of Movies, TV shows and people to discover.
                        Explore now.
                    </span>

                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for a Movie or TV Shows...'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={hanldeSearch}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
