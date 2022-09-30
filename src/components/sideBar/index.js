import { h, Fragment } from 'preact';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
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
import { useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import AlertComponent from '../alertComponent/index.js';
import logo from '../../assets/icons/logo-monapi.svg';

const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }
  
  return (
    <ProSidebar collapsed={menuCollapse}>
      <SidebarHeader style={{ textAlign: 'center', padding: '10px' }}>
        <div>
        {menuCollapse ? <img src={logo} alt="MonAPI" style={{width:'75%'}} /> : (<img src={logo} alt="MonAPI" />)}
        </div>
        <div id="navArrow-header" role='iconarrow' onClick={menuIconClick}>
          {/* <button aria-label='navArrow' > */}
          {menuCollapse ? (<FaRegArrowAltCircleRight role=''/>) : (<FaRegArrowAltCircleLeft/>)}
          {/* </button> */}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu>
          <MenuItem
            icon={<FaTachometerAlt />}>
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<FaExclamationCircle />}>
            Error Logs
          </MenuItem>
          <MenuItem
            icon={<FaPlay />}>
            API Test
          </MenuItem>
          <MenuItem
            icon={<FaUserPlus />}>
            Team Management
          </MenuItem>
          <MenuItem
            icon={<FaInfoCircle />}>
            Status Page
          </MenuItem>
          <MenuItem
            icon={<FaCog />}>
            Configuration
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
      { menuCollapse ? 
        (<></>) : (
        <Box style={{ padding: '10px', textAlign: 'center' }}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    Current Team
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>)
      }
        <Menu>
          <div style={{ color: 'red' }}>
            <MenuItem icon={<FaSignOutAlt />}>
              <div id='logoutButton'>
                <AlertComponent
                  isButton={false}
                  displayText='Logout'
                  header='Logout'
                  body='Are you sure want to logout?'
                  buttonLeftText='Cancel'
                  buttonRightText='Yes'
                  buttonRightColor='red'>
                </AlertComponent>
              </div>
            </MenuItem>
          </div>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  )
}
export default SideBar;