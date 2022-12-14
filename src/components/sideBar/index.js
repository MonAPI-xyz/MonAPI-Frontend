import { h, Fragment } from 'preact';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Spinner,
} from '@chakra-ui/react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import {
  FaTachometerAlt,
  FaExclamationCircle,
  FaPlay,
  FaUserPlus,
  FaInfoCircle,
  FaCog,
  FaSignOutAlt,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight
} from 'react-icons/fa';
import { getUserToken, deleteUserToken } from '../../config/api/auth.js';
import { route, useRouter } from 'preact-router';
import { Link } from 'preact-router/match';
import { useEffect, useState, useContext } from 'preact/hooks';
import AlertComponent from '../alertComponent/index.js';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import logo from '../../assets/icons/logo-monapi.svg';
import ROUTE from '../../config/api/route.js';
import 'react-pro-sidebar/dist/css/styles.css';
import style from './style.css';
import { UserContext } from '../../config/context/index.js';

const SideBar = ({ menuCollapse, setMenuCollapse }) => {
  // Trigger re-render when route change
  const router = useRouter()[0];

  const [logoutPopup, setLogoutPopup] = useState(false)
  const [isLoadingLogout, setIsLoadingLogout] = useState(false)
  const [listTeam, setListTeam] = useState([])
  const { currentTeam } = useContext(UserContext);
  const [currentTeamId, setCurrentTeamId] = currentTeam;
  const [currentTeamInformation, setCurrentTeamInformation] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/auth/available_team/`, {
      headers: {
        Authorization: `Token ${getUserToken()}`
      }
    }).then((response) => {
      setListTeam(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${BASE_URL}/auth/current_team/`, {
      headers: {
        Authorization: `Token ${getUserToken()}`
      }
    }).then((response) => {
      setCurrentTeamInformation(response.data)
    })
  }, [currentTeamId])

  const changeCurrentTeam = (id) => {
    const formData = new FormData()
    formData.append('id', id)
    axios.post(`${BASE_URL}/auth/change_team/`, formData, {
      headers: {
        Authorization: `Token ${getUserToken()}`
      }
    }).then(() => {
      setCurrentTeamId(id)
      window.location.reload();
    })
  }

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }
  const onSubmit = () => {
    setIsLoadingLogout(true)
    axios.post(`${BASE_URL}/auth/logout/`, {}, { headers: { Authorization: `Token ${getUserToken()}` } })
      .then(() => {
        deleteUserToken()
        route(ROUTE.LOGIN)
        setIsLoadingLogout(false)
      })
  };

  return (
    <ProSidebar collapsed={menuCollapse}>
      <SidebarHeader style={{ textAlign: 'center', padding: '10px' }}>
        <Link href="/">
          {menuCollapse ? <img src={logo} alt="MonAPI" style={{ width: '75%' }} /> : (<img src={logo} alt="MonAPI" />)}
        </Link>
        <div id="navArrow-header" role='iconarrow' onClick={menuIconClick}>
          {menuCollapse ? (<FaRegArrowAltCircleRight role='' />) : (<FaRegArrowAltCircleLeft />)}
        </div>


      </SidebarHeader>

      <SidebarContent>
        {menuCollapse ?
          (<></>) : (
            <Box style={{ paddingLeft: '10px', paddingRight: '10px', textAlign: 'center' }}>
              <Accordion allowToggle className={style['team-accordion']}>
                <AccordionItem>
                  <h2>
                    <AccordionButton data-testid={'accordionButton'}>
                      <Box flex='1' textAlign='left'>
                        <b>{currentTeamInformation.name}</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mx='12px' bg="#F1F1F1" textAlign="left" className={style['team-list-accordion']}>
                    {listTeam !== [] &&
                      <ul style={{ padding: '10px 4px 0px' }}>
                        {listTeam.map((item, index) => (
                          <li onClick={() => changeCurrentTeam(item.id)} style={{ paddingBottom: '10px', paddingTop: '10px', cursor: 'pointer' }} key={index}>
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    }
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>)
        }

        <Menu>
          <MenuItem
            data-testid="menu-item-dashboard"
            className={router.url === "/" && style['menu-item-active']}
            icon={<FaTachometerAlt />}>
            Dashboard
            <Link class={style['menu-button']} href="/" />
          </MenuItem>
          <MenuItem
            data-testid="menu-item-error-logs"
            className={router.url === "/error-logs/" && style['menu-item-active']}
            icon={<FaExclamationCircle />}>
            Error Logs
            <Link class={style['menu-button']} href="/error-logs/" />
          </MenuItem>
          <MenuItem
            data-testid="menu-item-test-api"
            className={router.url === "/test-api/" && style['menu-item-active']}
            icon={<FaPlay />}>
            API Test
            <Link class={style['menu-button']} href="/test-api/" />
          </MenuItem>
          <MenuItem
            data-testid="menu-item-team-management"
            className={router.url.includes("/team-management") && style['menu-item-active']}
            icon={<FaUserPlus />}>
            Team Management
            <Link class={style['menu-button']} href="/team-management/current/" />
          </MenuItem>
          <MenuItem
            data-testid="menu-item-status-page"
            className={router.url === "/status-page/" && style['menu-item-active']}
            icon={<FaInfoCircle />}>
            Status Page
            <Link class={style['menu-button']} activeClassName={style['active']} href="/status-page/" />
          </MenuItem>
          <MenuItem
            data-testid="menu-item-configuration"
            className={router.url === "/configuration/" && style['menu-item-active']}
            icon={<FaCog />}>
            Configuration
            <Link class={style['menu-button']} href="/configuration/" />
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <Menu onClick={() => { setLogoutPopup(true) }}>
          <div style={{ color: 'red' }}>
            <MenuItem icon={<FaSignOutAlt />}>
              <div id='logoutButton'>
                <AlertComponent
                  isButton={false}
                  displayText='Logout'
                  header='Logout'
                  body='Are you sure want to logout?'
                  buttonLeftText='Cancel'
                  buttonRightText={isLoadingLogout ? <Spinner /> : 'Yes'}
                  popupOpen={logoutPopup}
                  setPopupOpen={setLogoutPopup}
                  onSubmit={onSubmit}
                  buttonRightColor='red' />
              </div>
            </MenuItem>
          </div>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  )
}
export default SideBar;