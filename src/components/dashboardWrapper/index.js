import { h } from 'preact';
import SideBar from '../sideBar';
import style from './style.css';
import { useState } from 'preact/hooks';

const DashboardWrapper = ({children}) => {
    const [menuCollapse, setMenuCollapse] = useState(false)

    return (
        <div class={style['dashboard']}>
            <div class={`${style['dashboard-sidebar']} ${menuCollapse && style['dashboard-sidebar-collapse']}`}>
                <div class={style['dashboard-inner-sidebar']}>
                    <SideBar menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} />
                </div>
            </div>
            <div class={`${style['dashboard-content']} ${menuCollapse && style['dashboard-content-sidebar-collapse']}`}>
                {children}
            </div>
        </div>
    )
}

export default DashboardWrapper;