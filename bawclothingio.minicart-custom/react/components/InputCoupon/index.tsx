import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import addCoupon from '../../graphql/Mutations/insertCupon.graphql';
import clearOrderFormMessagesMutatios from '../../graphql/Mutations/clearOrderFormMessages.graphql';

import { useOrderForm } from 'vtex.order-manager/OrderForm';

interface DiscountCouponProps {}

import style from "./style.css";
import { ToastNotifications } from '../Toast';

export function DiscountCoupon({} : DiscountCouponProps) {

  const [coupon , setCoupon] = useState("");
  const [couponLocalStorage, setCouponLocalStorage] = useState("");

  const {
    orderForm: { id }    
  } = useOrderForm();

  const [showToast, setShowtoast] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    flag: false,
    warning: true
  });

  const [handleMutationCoupon]  = useMutation(addCoupon);
  const [FCclearOrderFormMessages]  = useMutation(clearOrderFormMessagesMutatios);

  useEffect( () => {

    if (message.text.trim() == "") return;

    onHandleClosed();

  }, [message])

  useEffect( () => {
    getCoupon()
  }, [])


  function getCoupon() {

    const cpLocalStorage = JSON.parse(localStorage.orderform);

    if(cpLocalStorage != "" && cpLocalStorage?.marketingData.coupon != "") {

      setCouponLocalStorage(cpLocalStorage)
      setCoupon(cpLocalStorage.marketingData.coupon)
    }

  }

  async function HandleCoupon(event: FormEvent) {

    event.preventDefault();
    
    if (coupon == "")  return;

    const {
      data: {
        insertCoupon: {
          messages: {
            couponMessages
          }
        }
      }
    } = await handleMutationCoupon({
      variables: {
        ID: id,
        text: coupon
      },
    })
    
    if (couponMessages?.length > 0) {

      switch (couponMessages[0].code) {

        case "couponExpired":
            setMessage({ 
              text: "O cupom que você utilizou já expirou",
              flag: !showToast,
              warning: true
            });
          break;
      
        case "couponNotFound":
            setMessage({ 
              text: "O cupom que você utilizou não é válido",
              flag: !showToast,
              warning: true
            });
          break;
    
        default:
          break;

      } 
      
      //clearOrderFormMessage rodar essa mutation quando recebermos um erro do cupon
      await FCclearOrderFormMessages({
        variables: {
          orderFormId: id
        }
      })
      
    } else {

      setMessage({ 
        text: "O cupom foi adicionado com sucesso",
        flag: !showToast,
        warning: false
      });

      setCouponLocalStorage(coupon);

    }
    
  }

  async function HandleRemoveCoupon(event: FormEvent) {
    event.preventDefault();

    //remove cupom passando um invalido
    await handleMutationCoupon({
      variables: {
        ID: id,
        text: "invalido"
      },
    })

    setMessage({ 
      text: "O cupom foi removido com sucesso",
      flag: !showToast,
      warning: false
    });

    //limpa as variaveis
    setCouponLocalStorage("");
    setCoupon("");

    await FCclearOrderFormMessages({
      variables: {
        orderFormId: id
      }
    })

  }

  function onHandleClosed() {
    
    setShowtoast(!showToast);

  }

  return (
      <div className={style.couponContainerMinicartBaw} >
          
          <label>Cupom de Desconto</label>

          { couponLocalStorage == ""
            ?
            (
              <form onSubmit={(event) => HandleCoupon(event)} className={style.couponInputMinicartBaw} >
            
                  <input 
                      type="text" 
                      placeholder="insira o código"
                      onChange={({ target }) => setCoupon((target.value).toUpperCase())} 
                      required
                      value={coupon}
                  />   
                  <button type="submit"></button>
              </form>
            )
            : (
                <form onSubmit={(event) => HandleRemoveCoupon(event)} className={style.RemoveCouponInputMinicartBaw} >
                            
                    <input 
                        type="text" 
                        placeholder={coupon}
                        value={coupon}
                        disabled
                        required
                    />   
                    <button type="submit">remove</button>
                </form>
            )
          }
          

          {

            // showToast && (
            <ToastNotifications 
              showToast={showToast}
              message={message?.text}
              warning={message.warning}
              onHandleClosed={() => onHandleClosed()}
            />
            // )

          }
          


      </div>
    
    
  )
}