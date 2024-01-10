import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Step1 } from "./components/steps/step1";
import { Step2 } from "./components/steps/step2";
import { Step3 } from "./components/steps/step3";
import { StepSendCode } from "./components/steps/step4";
import { StepFollowExchange } from "./components/steps/step5";
import api from "./server/api";
import { Creators } from "./store/ducks/exchangeProduct";
import style from "./style.css";

export function PageMain(props: any) {

    const { step } = useSelector((state: any) => state.exchangeProduct);

    console.log({
        step
    })

    async function getUser() {
        const resp = await fetch("/no-cache/profileSystem/getProfile")
        const json = await resp.json();

        if (json.IsUserDefined) {
            return json.Email
        }

        return null
    }

    useEffect(() => {
        async function fetchData() {
            const users = await getUser();

            console.log({ users });

            if (!users) return;

            const { data } = await api.get(`/orders/${users}`);

            console.log({
                data
            })

            props.update({ items: data })
        }



        fetchData();
        console.log({ "useEffect step": step })
    }, [])

    return (
        <main className={style.containerMain}>
            {step == 1 && (<Step1 {...props} />)}
            {step == 2 && (<Step2 {...props} />)}
            {step == 3 && (<Step3 {...props} />)}
            {step == 4 && (<StepSendCode {...props} />)}
            {step == 5 && (<StepFollowExchange {...props} />)}
        </main>
    )

}

const mapStateToProps = (state: any) => ({
    exch: state.TristarState,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(Creators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PageMain);