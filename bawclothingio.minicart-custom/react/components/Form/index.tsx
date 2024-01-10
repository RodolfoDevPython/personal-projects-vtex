import React, { FormEvent, useState } from "react"
import style from "./style.css";

import { useOrderForm } from 'vtex.order-manager/OrderForm';

import UpOrderFormProfile from '../../graphql/Mutations/updateOrderFormProfile.graphql';
import { useMutation } from 'react-apollo';

import iconLogo from "../../../assets/icons/background-logo-baw-minicart.svg";
import iconEmail from "../../../assets/icons/icon-white-email.svg";
import iconWhatsaap from "../../../assets/icons/icon-white-whatsaap.svg";
import iconLocation from "../../../assets/icons/icon-white-location.svg";

interface FormBawProps {
    showFormbaw: boolean,
    handleOpen: (_ : boolean) => void
}

export function FormBaw({
    showFormbaw,
    handleOpen
}: FormBawProps) {

    const {
        orderForm: {
            id
        }
      } = useOrderForm();

    const  [email, setEmail] = useState("");

    const [handleUpdateOrderFormProfile]  = useMutation(UpOrderFormProfile);

    async function handleGoCheckout(event: FormEvent) {

        event.preventDefault();

        try {
            await handleUpdateOrderFormProfile({
                variables: {
                    ID: id,
                    email: email
                },
            })
    
            location.href = "/checkout/#profile";
        
        } catch (error) {
            console.log({
                error
            })            
        }
        
    }

    return(

        <div className={style.formMinicartBaw} >

            <div className={style.formHeaderMinicartBaw}>
                <img src={iconLogo} alt="logo-baw" />
            </div>


            <form onSubmit={(event) => handleGoCheckout(event)}>
                <h3 className={style.titleMobileformMinicartBaw} >AUTENTICAÇÃO</h3>
                <a onClick={ () => handleOpen(!showFormbaw)}>voltar para o carrinho</a>

                <div className={style.formMinicartBawWrapper}>
                    
                    <span>
                        Para Finalizar a compra, informe seu email:
                        <br />
                        <strong>Rápida. Fácil. Seguro</strong>
                    </span>

                    <div className={style.formInputMinicartBaw} >
                        <input 
                            type="email" 
                            placeholder="Digite seu e-mail" 
                            required 
                            onChange={({ target }) => setEmail(target.value)}
                        />   
                        <button type="submit"></button>
                    </div>
                </div>
                
                

            </form>

            <div className={style.formFooterMinicartBaw} >
                <p>
                    Confirme seu e-mail, nós o utilizamos para: <br />
                    Identificar seu perfil <br />
                    Notificar sobre o andamento do seu pedido <br />
                    Gerenciar seu histórico de compras <br />
                    Acelerar o preenchimento de suas informações <br />
                </p>
            </div>

            <div className={style.formFooterMobileMinicartBaw} >

                <a>
                    <img height="24" width="23" src={iconWhatsaap} alt="iconWhatsaap" />
                    <span>11 96316-4115</span>
                </a>

                <a>
                    <img width="24" height="18" src={iconEmail} alt="iconEmail" />
                    <span>sac@bawclothing.com.br</span>
                </a>

                <a>
                    <img width="19" height="24" src={iconLocation} alt="iconLocation" />
                    <span>R. Dr Leonardo Pinto, 31 - Bom Retiro,SP</span>
                </a>

            </div>

        </div>
               
    )
}