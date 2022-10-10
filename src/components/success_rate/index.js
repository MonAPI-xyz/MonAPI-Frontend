import { h, Fragment } from 'preact';
import style from './style.css';

const SuccessRate = ({success,failed})=> {
    return (
        <>
            {(success == 0 & failed == 0)?
                <div class={style['grey-bar']}>
                    
                </div>
                :
                <>
                    {(success >= failed)?
                        <div class={style['green-bar']}>
                            
                        </div>
                        :
                        <div class={style['red-bar']}>

                        </div>
                    }
                </>     
            }
        </>        
    )
}

export default SuccessRate;
