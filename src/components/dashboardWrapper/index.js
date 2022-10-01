import { h } from 'preact';
import SideBar from '../sideBar';
import style from './style.css';

const DashboardWrapper = ({children}) => {
    return (
        <div class={style['dashboard']}>
            <SideBar />
            <div class={style['dashboard-content']}>
                {children}
            </div>
        </div>
    )
}

export default DashboardWrapper;