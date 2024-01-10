export interface Document {
  id: string
  fields: Field[]
}

export interface Field {
  key: string
  value: string
}
