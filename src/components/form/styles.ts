// styles.ts

// ---------------------
// 1. Container com fundo degradê multi-stop
// ---------------------
export const formContainer = `
  max-w-4xl mx-auto p-6 
  rounded-xl shadow-lg

  /* Cria um gradiente que vai do canto superior-esquerdo 
     ao canto inferior-direito (to_br) 
     passando pelas cores que você forneceu, em seus respectivos offsets. */
  bg-[linear-gradient(to_br,_#fad2a4_0%,_#f6cda0_3%,_#ca9674_35%,_#aa6e55_63%,_#965641_85%,_#8f4d3a_98%)]
`

// ---------------------
// 2. Título com gradiente de texto
// ---------------------
export const formTitle = `
  text-3xl font-bold 
  text-transparent bg-clip-text

  /* Aqui usamos um gradiente na horizontal (to_right), 
     mas com os mesmos stops. Sinta-se livre para mudar. */
  bg-[linear-gradient(to_right,_#fad2a4_0%,_#f6cda0_3%,_#ca9674_35%,_#aa6e55_63%,_#965641_85%,_#8f4d3a_98%)]
  
  mb-8 text-center
`

// ---------------------
// 3. Outras classes
// ---------------------
export const formGrid = `
  grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4
`

export const inputLabel = `
  block text-sm font-medium text-gray-700
`

// Para dar um leve efeito de foco dourado, 
// você pode escolher uma das cores do seu gradiente (ex: #ca9674) 
export const inputField = `
  mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm
  transition-all duration-200
  focus:border-[#ca9674] focus:ring-2 focus:ring-[#ca9674]/50
  focus:bg-white sm:text-sm
`

export const selectField = inputField
export const textAreaField = inputField

export const stoneHeader = `
  flex justify-between items-center mt-8 mb-6
`

// Gradiente de texto nos títulos das seções
export const stoneTitle = `
  text-2xl font-semibold text-transparent bg-clip-text
  bg-[linear-gradient(to_right,_#fad2a4_0%,_#f6cda0_3%,_#ca9674_35%,_#aa6e55_63%,_#965641_85%,_#8f4d3a_98%)]
`


export const stoneSection = `
  space-y-6
`

export const actionButtonsContainer = `
  flex justify-end space-x-4 mt-8
`

// Botão “Cancelar”
export const cancelButton = `
  inline-flex justify-center py-2.5 px-6 border border-gray-300 rounded-lg shadow-sm 
  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
  focus:outline-none focus:ring-2 focus:ring-offset-2 
  focus:ring-[#ca9674] transition-all duration-200
`

// Botão “Salvar” com gradiente multi-stop
export const submitButton = `

  inline-flex justify-center py-2.5 px-8  rounded-lg shadow-sm 
  text-sm font-medium text-black 
  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
  cursor-pointer

/* Gradiente normal */
  bg-[linear-gradient(to_right,_#fad2a4_3%,_#f6cda0_15%,_#ca9674_65%,_#aa6e55_85%,_#965641_95%,_#8f4d3a_99%)]

  /* Para hover, mudamos levemente as paradas */
  hover:bg-[linear-gradient(to_right,_#f6cda0_0%,_#fad2a4_10%,_#ca9674_40%,_#aa6e55_60%,_#965641_80%,_#8f4d3a_95%)]

  /* Foco */
  focus:ring-[#ca9674]

`
// Botão com gradiente multi-stop
export const addStoneButton = `
  inline-flex items-center px-4 py-2 
  text-sm font-medium rounded-lg text-black shadow-sm 
  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
  cursor-pointer

  /* Gradiente normal */
 bg-[linear-gradient(to_right,_#fad2a4_3%,_#f6cda0_15%,_#ca9674_65%,_#aa6e55_85%,_#965641_95%,_#8f4d3a_99%)]

  /* Para hover, mudamos levemente as paradas */
  hover:bg-[linear-gradient(to_right,_#f6cda0_0%,_#fad2a4_10%,_#ca9674_40%,_#aa6e55_60%,_#965641_80%,_#8f4d3a_95%)]

  /* Foco */
  focus:ring-[#ca9674]
`


export const imageUploadContainer = `
  mb-8
`

export const imagePreview = `
  relative rounded-lg overflow-hidden shadow-md
`

// Botão de upload com borda normal
export const imageUploadButton = `
  inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg
  text-gray-700 bg-white hover:bg-gray-50 focus:outline-none 
  focus:ring-2 focus:ring-offset-2 focus:ring-[#ca9674]
  transition-all duration-200 cursor-pointer
`
