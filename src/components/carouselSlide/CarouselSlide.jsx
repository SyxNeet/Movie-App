import React from 'react'
import { Rate } from 'antd';
import { Spin } from 'antd';
import './style.scss'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Slider from 'react-slick'
import { settings } from '../settingSlickSlider/Setting';
import { useSelector } from 'react-redux';
import noPoster from '../../assets/no-poster.png'
import Typography from 'antd/es/typography/Typography'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function CarouselSlide({ data, loading, endPoint }) {


    const { url } = useSelector(state => state.home)

    return (
        <ContentWrapper>
            {loading ?
                (
                    <Spin style={{ display: "flex", justifyContent: "center", alignItems: "center" }} size="large" />
                ) :
                (
                    <Slider {...settings}>
                        {data && data?.results?.map((data, index) => {
                            const posterUrl = data?.poster_path
                                ? url?.poster + data?.poster_path
                                : noPoster
                            return (
                                <div className="card-item" key={index}>
                                    <Link to={`/${endPoint ? endPoint : 'movie'}/${data?.id}`}>
                                        <div className="card-inner">
                                            <div className="card-top">
                                                <img src={posterUrl} alt={data?.title} />
                                            </div>
                                        </div>
                                        <div className="card-bottom">
                                            <Rate style={{ display: 'flex', flexWrap: 'wrap' }} disabled defaultValue={(Math.floor((data?.vote_average) / 2) + 1)} />
                                            <div className="card-info">
                                                <Typography.Title style={{ color: "#fff" }} level={5} >{data?.title}</Typography.Title>
                                                <span className='date' style={{ fontWeight: 300 }}>
                                                    {dayjs(data?.release_date).format('MMM D, YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}

                    </Slider>
                )
            }


        </ContentWrapper>
    )
}

export default CarouselSlide