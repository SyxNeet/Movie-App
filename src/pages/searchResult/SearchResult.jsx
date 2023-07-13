import React, { useState } from 'react'
import './SearchResult.scss'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Typography from 'antd/es/typography/Typography'
import { Col, Image, Pagination, Row, Skeleton, Space } from 'antd'
import Img from '../../components/lazyLoadImage/Img'
import CurrentTime from '../../components/currentTime/CurrentTime'
function SearchResult() {

    const { query } = useParams()
    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)

    const { data, loading } = useFetch(`/search/multi?query=${query}&page=${currentPage}`)
    const filterData = data?.results.filter((mv) => mv?.backdrop_path !== null && mv?.media_type !== 'person')
    const handlePageChange = (page) => {
        setCurrentPage(page)
        // setCurrentPage(1)
    }


    return (
        <div className='searchResult'>
            <ContentWrapper>
                <Row>
                    <Col >
                        <Typography.Title level={2} style={{ color: '#fff' }} >{`Result Search of '${query}'`}</Typography.Title>
                    </Col>
                    {/* <CurrentTime /> */}
                </Row>
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

                                        onClick={() => navigate(`/${data.media_type}/${data.id}`)}
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
                                {data?.results.map((data, index) => (
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

export default SearchResult
