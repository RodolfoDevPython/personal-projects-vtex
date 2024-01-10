import { FC } from 'react';

interface RenderProps {
  name: string
  path: string
}

interface Props {
  render: (paths: RenderProps[]) => any
}

const ExchangeProductLinks: FC<Props> = ({ render }: Props) => {
  return render([
    {
      name: "Troca de Produto",
      path: '/exchange-product',
    },
  ])
}

export default ExchangeProductLinks;
