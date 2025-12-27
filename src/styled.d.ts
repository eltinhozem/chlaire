import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    /* Fundo geral da página */
    background: string

    /* Fundo do formulário/card */
    formBackground: string

    /* Texto geral */
    text: string

    /* Cabeçalho e rodapé */
    headerBackground: string
    footerBackground: string

    /* Labels */
    labelColor: string

    /* Inputs */
    inputBackground: string
    inputText: string
    inputBorderColor: string
    inputFocusBorderColor: string
    inputFocusShadow: string
    inputFocusBackground: string
    placeholderColor: string

    /* Botões padrão (azul suave) */
    buttonBackground: string
    buttonText: string
    buttonHoverBackground: string
    buttonFocusShadow: string

    /* Botões de excluir (vermelho suave) */
    buttonBackgroundRed: string
    buttonTextRed: string
    buttonHoverBackgroundRed: string
    buttonFocusShadowRed: string

    /* Botão de adicionar pedra (verde suave) */
    addStoneButtonText: string
    addStoneButtonBackground: string
    addStoneButtonHoverBackground: string
    addStoneButtonFocusShadow: string
    addStoneButtonFocusColor: string

    /* Botões de ação (Cancelar - cinza suave) */
    actionButtonBorder: string
    actionButtonText: string
    actionButtonBackground: string
    actionButtonHoverBackground: string

    /* Card e outros containers */
    cardBackground: string
    cardShadow: string

    /* Upload de imagem */
    uploadButtonBorder: string
    uploadButtonText: string
    uploadButtonBackground: string
    uploadButtonHoverBackground: string
    imagePreviewBoxShadow: string

    /* Cor do título */
    titleColor: string

    /* Submit button */
    submitButtonText: string
    submitButtonBackground: string
    submitButtonFocusColor: string
  }
}
