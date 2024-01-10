import { Context } from 'vm'

import { json } from 'co-body'

export async function resendCouponEmail(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { messageCenterClient },
  } = ctx

  const {
    patientEmail,
    patientName,
    urlCart,
    dentistName,
    couponCode,
  } = await json(ctx.req)

  await messageCenterClient.post('shared-cart', {
    patientEmail,
    patientName,
    urlCart,
    dentistName,
    couponCode,
  })

  ctx.status = 204

  await next()
}
