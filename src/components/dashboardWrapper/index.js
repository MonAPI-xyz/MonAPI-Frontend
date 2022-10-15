import { h } from 'preact';
import SideBar from '../sideBar';
import style from './style.css';

const DashboardWrapper = ({children}) => {
    return (
        <div class={style['dashboard']}>
            <div class={style['dashboard-sidebar']}>
                <div class={style['dashboard-inner-sidebar']}>
                    <SideBar />
                </div>
            </div>
            <div class={style['dashboard-content']}>
                {children}
            </div>
        </div>
    )
}

export default DashboardWrapper;