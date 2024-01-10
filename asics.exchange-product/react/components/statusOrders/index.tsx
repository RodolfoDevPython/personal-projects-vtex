import { Header } from "../header";

export function Step3() {

    return (
        <>
            <Header
                title="Trocas e Devoluções"
                describe="Selecione o tamanho do novo produto"
            />

            <div>
                <span>Pedido enviada.</span>
            </div>
            <div>
                <p>Leve seu produto até uma agência dos correio, copie o código abaixo, e envie o produto até nós.
                    Seu produto será enviado para nós em um prazo de 7 dias úteis, após ser entregue será feita a
                    avaliação do produto. </p>

                <span>LE366531974SE</span>

                <span>Após avaliação será enviado o seu produto.</span>

                <div>
                    <button>Cancelar troca/devolução</button>

                    <button>Copiar código dos correios</button>
                </div>
            </div>

        </>

    )

}