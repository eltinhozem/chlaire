export interface Stone {
  id: string
  quantity: number
  sizeMm: number
  ct: number
  pricePerUnit: number
  totalPrice: number
}

export interface ProductStoneInput {
  quantity?: number | string
  quilates?: number | string
  pts?: number | string
}

export interface ProductData {
  weight?: number | string
  material?: string
  stones?: ProductStoneInput[]
  reference_name?: string
  category?: string
  client_name?: string
  rota?: string
}
