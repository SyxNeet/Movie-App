import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
import { fetchDataFromApi } from './utils/api'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import SearchResult from './pages/searchResult/SearchResult'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector(state => state.home)
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then(res => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        }
        dispatch(getApiConfiguration(url))
      })
  }

  useEffect(() => {
    fetchApiConfig()
  }, [])


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App






