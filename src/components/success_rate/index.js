import { h, Fragment } from 'preact';
import style from './style.css';

const SuccessRate = ({success,failed})=> {
    return (
        <>
            {(success == 0 && failed == 0)?
                <div class={style['grey-bar']}/>
                :
                <>
                    {(failed == 0)?
                        <div class={style['green-bar']} />
                        :
                        <>
                            {(success == 0)?
                                <div class={style['red-bar']} />
                                :
                                <div class={style['yellow-bar']}/>
                            }
                        </>     
                    }
                </>     
            }
        </>        
    )
}

export default SuccessRate;
