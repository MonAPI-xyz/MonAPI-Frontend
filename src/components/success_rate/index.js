import { h, Fragment } from 'preact';
import style from './style.css';

const SuccessRate = ({success,failed})=> {
    return (
        <>
            {(success > failed)?
                <div class={style['green-bar']}>
                    
                </div>
                :
                <>
                    {(success < failed)?
                        <div class={style['red-bar']}>
                            
                        </div>
                        :
                        <div class={style['grey-bar']}>

                        </div>
                    }
                </>       
            }
        </>        
    )
}

export default SuccessRate;
