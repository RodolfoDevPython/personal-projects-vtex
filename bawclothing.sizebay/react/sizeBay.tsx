import React, { useEffect } from "react";
import { useProduct } from 'vtex.product-context';

import style from "./style.css";

export default function sizeBay() {
  
  const productContext = useProduct();

  function createCustomStyle(TenantId: string) {
    const styles = [
      `https://static.sizebay.technology/${TenantId}/styles_v4.css`,
      'https://static.sizebay.technology/font/stores/fontRuler/styles.css'
    ]
  
    for (const iterator of styles) {
      let linkElem = document.createElement('link')
  
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('type', 'text/css')
      linkElem.setAttribute('href', iterator)
  
      document.querySelector('body')?.appendChild(linkElem)
    }
  }

  function clearContainerSizeBay() {

    const containerSizebay = document.querySelectorAll("#szb-container");
  
    if (containerSizebay.length > 0) {
      containerSizebay.forEach( e => e.remove());
    }    

  }

  useEffect( () => {
  
    const configsStorage = window?.localStorage?.getItem("@settingsAppSizeBay");  

    if (configsStorage?.trim() != "") {
      clearContainerSizeBay();
      buildIntegrationSizeBay(configsStorage);
    }
  

  }, [productContext]);


  function buildIntegrationSizeBay(settingsStorage: any) {
    
    if (!settingsStorage && !document.querySelector(".szb-vfr-btns")) return;

    try {

      const {
        TenantId,
      }: any = JSON.parse(settingsStorage);
  
      const { SizebayPrescripts } : any = window
  
      createCustomStyle(TenantId)
  
      SizebayPrescripts().getIntegration()
  
      const permalink = SizebayPrescripts().getPermalink()
      const tenantId = TenantId
      const buttons = SizebayPrescripts().getButtons()
      const anchor = SizebayPrescripts().getAnchors()
      const lang = SizebayPrescripts().getLanguage()
      const recommendation = SizebayPrescripts().getRecommendationText()
      let bool = true
  
      const payload = {
        permalink,
        tenantId,
        buttons,
        anchor,
        lang,
        recommendation
      }
  
      
      if (!document.querySelectorAll('.vfr__container').length && bool) {
        bool = false
      
        /* @ts-ignore */
        window.Sizebay?.Implantation(payload);
              
      }
  
      if (document.querySelectorAll('#szb-vfr-button').length > 0) {
        console.log('PRESCRIPT : VERSÃO 1.1')
      }
      
    } catch (error) {
      console.warn({ message: error.message })
    }
    
  }

  return (
    <div className={style.containerButtons}>
      <div id="szb_btn" style={{ display: "block", cursor: "pointer" }} ></div>
    </div>
  )
  
}
