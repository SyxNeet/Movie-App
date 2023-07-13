import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import './Header.scss'
function Header() {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    //handle toggle open MobileMen & search area

    const openMobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }

    const openShowSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    // handle Searchbar
    const hanldeSearch = (event) => {
        if (event.key === 'Enter' && searchTerm.length > 0) {
            navigate(`/search/${searchTerm}`)
        }
    }

    // handle navigate->explore

    const handleNavigateExplore = (type) => {
        if (type === 'movie') {
            navigate('/explore/movie')
        } else {
            navigate('/explore/tv')
        }
        setMobileMenu(false)
    }

    //handle scroll

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow('hide')
            } else {
                setShow('show')
            }
        } else {
            setShow('top')
        }
        setLastScrollY(window.scrollY)

    }

    // handle chang Page

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])


    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY])

    return (
        <header
            className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}
        >
            <ContentWrapper>
                <div className="logo" onClick={() => navigate('/')} >
                    <img src={logo} alt="logo" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => handleNavigateExplore('movie')} >Movies</li>
                    <li className="menuItem" onClick={() => handleNavigateExplore('tv')} >TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openShowSearch} />
                    </li>
                </ul>

                {/* mobile menu */}
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openShowSearch} />
                    {
                        mobileMenu
                            ?
                            (<VscChromeClose onClick={() => setMobileMenu(false)} />)
                            :
                            (<SlMenu onClick={openMobileMenu} />)
                    }
                </div>


            </ContentWrapper>
            {/* searchBar */}

            {showSearch &&
                (<div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder='Search for a Movie or TV Shows...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyUp={hanldeSearch}
                            />
                        </div>
                        <VscChromeClose onClick={() => setShowSearch(false)} />
                    </ContentWrapper>
                </div>)

            }
        </header>
    )
}

export default Header
