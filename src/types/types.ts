export type Currency = {
    code: string,
    name: string,
    symbol: string
}

export type Country = {
    caiptal: string,
    currencies: Currency[],
    name: string,
    population: number
}

export type Currencies = Currency[]

export type Error = string | null