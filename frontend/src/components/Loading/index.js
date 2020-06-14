import React from 'react';

import './styles.css';
import Load from '../../assets/loading.gif';

function Loading ({loading}) {
    return (
        <>
            {loading ?
                <div className='carregamento-container d-flex flex-column align-items-center justify-content-center'>
                     <img src={Load} alt="Carregando" width="110px"/>
                    <h5>Carregando ...</h5>
                </div>
                :
                <div className='carregamento-container d-none'>
                    <p>Feito</p>
                </div>
            }
        </>
    )
}

export default Loading;