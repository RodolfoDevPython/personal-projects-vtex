import { Document } from '../typings/masterdata'
/**
 * Currency Display Presentation options
 */
type CurrencyDisplay = 'none' | 'symbol' | 'code' | 'name'

interface Profile extends Record<string, string> {
  id: string
  name: string
  email: string
}

interface CurrencyOptions {
  /**
   * LCID Code (https://www.science.co.il/language/Locale-codes.php)
   */
  localeCode: string

  /**
   * currency country ISO code (https://www.currency-iso.org/dam/downloads/lists/list_one.xml)
   */
  currencyIsoCode: string

  currencyDisplay: CurrencyDisplay
}

export const normalizeCustomFields = (fields: Array<Record<string, string>>) =>
  fields.reduce<Record<string, string>>((prev, curr) => {
    const { key, value } = curr

    return { ...prev, [key]: value }
  }, {})

export const documentToProfile = (document: Document): Profile => {
  const { fields, id } = document

  const normalizedFields = fields.reduce<Record<string, string>>(
    (prev, curr) => {
      const { key, value } = curr

      return { ...prev, [key]: value }
    },
    {}
  )

  const { firstName, lastName, email } = normalizedFields
  const name = [firstName, lastName].filter((item) => item).join(' ')

  return { id, name, email, ...normalizedFields }
}

/**
 * Convert currency string to formated value
 * @param value string value
 * @param currencyOptions
 */
export const convertStringToCurrency = (
  value: string,
  currencyOptions: CurrencyOptions
) => {
  const convertedNumber = Number(value)

  return Intl.NumberFormat(currencyOptions.localeCode, {
    style: 'currency',
    currency: currencyOptions.currencyIsoCode,
    currencyDisplay: currencyOptions.currencyDisplay,
  }).format(convertedNumber)
}
