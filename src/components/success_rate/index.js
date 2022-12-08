import { h, Fragment } from 'preact';
import style from './style.css';

const SuccessRate = ({success,failed, width = '7px', height = '25px' })=> {
    return (
        <>
            {(success == 0 && failed == 0)?
                <div class={style['grey-bar']} style={{width, height}} />
                :
                <>
                    {(failed == 0)?
                        <div class={style['green-bar']} style={{width, height}} />
                        :
                        <>
                            {(success == 0)?
                                <div class={style['red-bar']} style={{width, height}} />
                                :
                                <div class={style['yellow-bar']} style={{width, height}} />
                            }
                        </>     
                    }
                </>     
            }
        </>        
    )
}

export default SuccessRate;
