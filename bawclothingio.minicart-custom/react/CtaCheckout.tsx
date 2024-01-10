import { ButtonToCheckout } from './components/ButtonToCheckout';

import { useState, useEffect } from 'react';
import { FormBaw } from './components/Form';

const CtaCheckout = () => {

    const [showFormbaw, setShowFormbaw] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

    function verifyUserlogged() {
        fetch("/no-cache/profileSystem/getProfile")
        .then(resp => resp.json())
        .then(json => {
            
            if (json?.IsUserDefined) {
                setUserLogged(true)
            }
            
        })
    }

    function handleOpen() {
        setShowFormbaw(!showFormbaw)
    }

    function redirectCheckout() {
        location.href = "/checkout/#cart";
    }

    useEffect( () => {
        verifyUserlogged();
    }, []) 


    return (
        <>
            { 
            showFormbaw ? 
                <FormBaw handleOpen={handleOpen} showFormbaw={showFormbaw}  /> 
            :
                <ButtonToCheckout handleOpen={!userLogged ? handleOpen : redirectCheckout } />
            }
            
        </>
    )    

}

export default CtaCheckout