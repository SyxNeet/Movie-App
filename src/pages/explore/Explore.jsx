import React, { useEffect, useState } from 'react'
import './Explore.scss'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Image, Pagination, Row, Select, Skeleton, Space } from 'antd'
import Typography from 'antd/es/typography/Typography'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import CurrentTime from '../../components/currentTime/CurrentTime'
function Explore() {

    const options =
        [
            {
                value: 'popularity.asc',
                label: 'From A -> Z',
            },
            {
                value: 'popularity.desc',
                label: 'From Z -> A',
            },
            {
                value: 'vote_average.asc',
                label: 'Rating A -> Z',
            },
            {
                value: 'vote_average.desc',
                label: 'Rating Z -> A',
            },
            {
                value: 'primary_release_date.asc',
                label: 'Release Date Ascending',
            },
            {
                value: 'primary_release_date.desc',
                label: 'Release Date Descending',
            }
        ]

    const navigate = useNavigate()
    const { mediaType } = useParams()
    const { url } = useSelector(state => state.home)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState('popularity.desc')


    const handleChangeShortBy = (value) => {
        setSortBy(value)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])
    const { data, loading } = useFetch(`/discover/${mediaType}?page=${currentPage}&sort_by=${sortBy}`)
    const filterData = data?.results.filter((mv) => mv?.backdrop_path !== null)
    return (
        <div className='explore'>
            <ContentWrapper>
                <Row>
                    <Col span={24}>


                        <Typography.Title level={2} style={{ color: '#fff' }}>
                            {`Explore ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`}
                        </Typography.Title>
                        <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CurrentTime />
                            <Select className='selected'
                                showSearch
                                style={{
                                    width: 200,
                                    marginBottom: '20px',
                                }}
                                placeholder="Sort by"
                                options={options}
                                onChange={handleChangeShortBy}
                            />
                        </Row>
                    </Col>
                </Row>


                {/* render data */}

                {
                    !loading
                        ? (<Row gutter={[16, 16]}>
                            {filterData?.map((data, index) => {
                                const urlImg = url.backdrop + data.backdrop_path
                                return (
                                    <Col
                                        key={index}
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        lg={6}
                                        xl={4}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '5px',
                                            alignItems: 'center'
                                        }}

                                        onClick={() => navigate(`/${mediaType}/${data.id}`)}
                                    >
                                        <Image preview={false} className='img' src={urlImg} height={300} width='100%' style={{ objectFit: 'cover' }} />
                                        <Row gutter={[10, 10]} style={{ width: "100%" }} >
                                            <Col span={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', color: '#fff', fontWeight: '350', gap: '10px' }}>
                                                <Space>{data.title || data.name}</Space>
                                                <Space>{data.first_air_date}</Space>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            })}


                        </Row>)
                        :
                        (
                            <Row gutter={[16, 16]}>
                                {data?.results?.map((data, index) => (
                                    <Col key={index}
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        lg={6}
                                        xl={4}
                                    >
                                        <Skeleton active />

                                    </Col>
                                ))}
                            </Row>
                        )
                }
                <Pagination
                    current={currentPage}
                    total={data?.total_pages}
                    onChange={handlePageChange}
                    style={{ marginTop: '20px', textAlign: 'center', color: 'yellow' }}
                />

            </ContentWrapper>
        </div>
    )
}

export default Explore
