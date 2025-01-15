import { NewPlugin } from 'pretty-format'
import { css } from 'styled-components'

declare global {
  namespace jest {
    interface AsymmetricMatcher {
      $$typeof: symbol // Substituído por 'symbol' (primitivo) para evitar erros de lint
      sample?:
        | string
        | RegExp
        | object
        | Array<unknown>
        | ((...args: unknown[]) => unknown)
    }
    type Value = string | number | RegExp | AsymmetricMatcher | undefined
    interface Options {
      media?: string
      modifier?: string | ReturnType<typeof css>
      supports?: string
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toHaveStyleRule(property: string, value?: Value, options?: Options): R
    }
  }
}

export interface StyledComponentsSerializerOptions {
  addStyles?: boolean
  classNameFormatter?: (index: number) => string
}

export declare const styleSheetSerializer: NewPlugin & {
  setStyleSheetSerializerOptions: (
    options?: StyledComponentsSerializerOptions
  ) => void
}
