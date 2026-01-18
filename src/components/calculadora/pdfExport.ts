import type { Supplier, SupplierPriceEntry } from './fornecedor';
import { getStonePriceByMm } from './fornecedor';
import type { Stone, ProductData } from './types';
import { escapeHtml, findConversionByMm } from './utils';

interface CalculationPdfOptions {
  goldWeight: number;
  goldPrice18k: number;
  effectiveGoldPrice: number;
  margin: number;
  dollarStone: number;
  goldValue: number;
  stonesValue: number;
  totalQty: number;
  totalValue: number;
  stones: Stone[];
  supplier: Supplier;
  fallbackSupplierPrices?: SupplierPriceEntry[];
  product?: ProductData;
}

export const openCalculationPdf = ({
  goldWeight,
  goldPrice18k,
  effectiveGoldPrice,
  margin,
  dollarStone,
  goldValue,
  stonesValue,
  totalQty,
  totalValue,
  stones,
  supplier,
  fallbackSupplierPrices,
  product
}: CalculationPdfOptions) => {
  const goldFormula = `${goldWeight.toFixed(2)}g × R$ ${goldPrice18k.toFixed(2)}/g × margem ${margin.toFixed(2)} = R$ ${goldValue.toFixed(2)}`;
  const stonesFormula =
    stones.length === 0
      ? 'Sem pedras'
      : stones
          .map((s) => {
            const basePrice = getStonePriceByMm(s.sizeMm, supplier.prices, fallbackSupplierPrices);
            return `${s.quantity} × (R$ ${basePrice.toFixed(2)} × ${s.ct.toFixed(3)}ct × dollar ${dollarStone.toFixed(2)} × margem ${margin.toFixed(2)}) = R$ ${s.totalPrice.toFixed(2)}`;
          })
          .join('<br/>');
  const calculationLine = `${goldFormula}${stones.length ? '<br/>' + stonesFormula + '<br/>' : '<br/>'}<strong>Total: R$ ${totalValue.toFixed(2)}</strong>`;
  const safeSupplierName = escapeHtml(supplier.name);

  const printWindow = window.open('', '_blank', 'width=900,height=1200');
  if (!printWindow) return;
  printWindow.opener = null;

  const productInfo = `
    <p><strong>Referência:</strong> ${escapeHtml(product?.reference_name || '-')}<br/>
    <strong>Categoria:</strong> ${escapeHtml(product?.category || '-')}<br/>
    <strong>Cliente:</strong> ${escapeHtml(product?.client_name || '-')}<br/>
    <strong>Rota:</strong> ${escapeHtml(product?.rota || '-')}</p>
  `;

  const stonesHtml =
    stones.length === 0
      ? '<p>Sem pedras.</p>'
      : `<ol>${stones
          .map((s, idx) => {
            const basePrice = getStonePriceByMm(s.sizeMm, supplier.prices, fallbackSupplierPrices);
            const calcDetail = `R$ ${basePrice.toFixed(2)} × ${s.ct.toFixed(3)}ct × dollar ${dollarStone.toFixed(2)} × margem ${margin.toFixed(2)}`;
            return `<li>
              <strong>Pedra ${idx + 1}</strong><br/>
              Quantidade: ${s.quantity}<br/>
              Tamanho (mm): ${s.sizeMm.toFixed(2)}<br/>
              CT estimado: ${s.ct.toFixed(3)}<br/>
              Preço/unidade: R$ ${s.pricePerUnit.toFixed(2)}<br/>
              Cálculo: ${calcDetail} = R$ ${s.pricePerUnit.toFixed(2)} (un)<br/>
              Subtotal: R$ ${s.totalPrice.toFixed(2)}
            </li>`;
          })
          .join('')}</ol>`;

  const html = `
    <html>
      <head>
        <title>Calcular Joia - PDF</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #1f2937; }
          h1 { margin: 0 0 8px; }
          h2 { margin: 16px 0 8px; }
          .section { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 14px; }
          ol { padding-left: 18px; }
          li { margin-bottom: 10px; }
          .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin-top: 10px; }
          .summary-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; }
          .summary-label { display: block; font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: #6b7280; margin-bottom: 4px; }
          .summary-value { font-weight: 600; color: #111827; font-size: 14px; }
          .summary-item.total { background: #fff7ed; border-color: #fdba74; }
          .summary-value.total-value { font-size: 16px; color: #b45309; }
          .calc { margin-top: 10px; padding: 10px 12px; border-left: 3px solid #c08457; background: #fffbf5; color: #78350f; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1>Calcular Joia</h1>
        <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>

        <div class="section">
          <h2>Resumo financeiro</h2>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">Ouro 18K</span>
              <span class="summary-value">R$ ${effectiveGoldPrice.toFixed(2)}/g</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Peso</span>
              <span class="summary-value">${goldWeight.toFixed(2)} g</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Subtotal ouro</span>
              <span class="summary-value">R$ ${goldValue.toFixed(2)}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Fornecedor</span>
              <span class="summary-value">${safeSupplierName}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Pedras (${totalQty})</span>
              <span class="summary-value">R$ ${stonesValue.toFixed(2)}</span>
            </div>
            <div class="summary-item total">
              <span class="summary-label">Total da joia</span>
              <span class="summary-value total-value">R$ ${totalValue.toFixed(2)}</span>
            </div>
          </div>
          <p class="calc"><strong>Cálculo:</strong> ${calculationLine}</p>
        </div>

        <div class="section">
          <h2>Dados da joia</h2>
          ${productInfo}
        </div>

        <div class="section">
          <h2>Ouro</h2>
          <p>
            Preço 18K/g (c/ margem): R$ ${effectiveGoldPrice.toFixed(2)}<br/>
            Peso: ${goldWeight.toFixed(2)} g<br/>
            Subtotal ouro: R$ ${goldValue.toFixed(2)}
          </p>
        </div>

        <div class="section">
          <h2>Pedras</h2>
          <p>Fornecedor: ${safeSupplierName} | Qtd total: ${totalQty} | Subtotal: R$ ${stonesValue.toFixed(2)}</p>
          ${stonesHtml}
        </div>

        <div class="section">
          <h2>Total</h2>
          <p><strong>R$ ${totalValue.toFixed(2)}</strong></p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 400);
};

interface DescriptionPdfOptions {
  txtFolderCode: string;
  goldWeight: number;
  parsedWidth: number | null;
  parsedHeight: number | null;
  stones: Stone[];
}

export const exportDescriptionPdf = async ({
  txtFolderCode,
  goldWeight,
  parsedWidth,
  parsedHeight,
  stones
}: DescriptionPdfOptions) => {
  const codigo = escapeHtml(txtFolderCode || '-');
  const pesoMedio = `${goldWeight.toFixed(2)} g`;
  const largura = parsedWidth ? `${parsedWidth.toFixed(2)} mm` : '-';
  const altura = parsedHeight ? `${parsedHeight.toFixed(2)} mm` : '-';

  const stoneSummary = stones.length
    ? stones.map((s) => `${s.quantity} de ${s.sizeMm.toFixed(1)}mm`).join(' / ')
    : 'Sem pedras';

  const formatPoints = (points: number, { allowZero = false } = {}) => {
    if (!Number.isFinite(points)) return allowZero ? '0' : '';
    if (points <= 0 && !allowZero) return '';
    if (points === 0) return '0';
    return Number.isInteger(points) ? points.toFixed(0) : points.toFixed(2).replace(/\.?0+$/, '');
  };

  const totalPoints = stones.reduce((sum, s) => {
    const conv = findConversionByMm(s.sizeMm);
    return sum + (conv?.points || 0) * s.quantity;
  }, 0);
  const totalCt = stones.reduce((sum, s) => sum + (s.ct || 0) * s.quantity, 0);
  const largestStonePoints = stones.reduce((max, s) => {
    const conv = findConversionByMm(s.sizeMm);
    return Math.max(max, conv?.points || 0);
  }, 0);
  const pontosDiamante = `Total de ${formatPoints(totalPoints, { allowZero: true })} pontos`;
  const pesoMedioDiamantes = `Média de ${totalCt.toFixed(3)} ct`;
  const fichaTitlePoints = formatPoints(largestStonePoints);
  const giaSuffix = largestStonePoints >= 30 ? 'com GIA' : '';
  const fichaTitle = ` Anel Solitário Diamante ${
    fichaTitlePoints ? `${fichaTitlePoints}pts ${giaSuffix} ` : ''
  }Ouro Amarelo 18k`;
  const giaLine =
    largestStonePoints >= 30
      ? `
<ul class="description-composition">
  <li>Diamante Central com GIA na Classificação VS Cor J</li>
</ul>`
      : '';

  const descricaoHtml = `
<h2 class="description-title"><strong>Descrição e Composição</strong></h2>
${escapeHtml(fichaTitle)}
<p data-start="742" data-end="888"><strong data-start="745" data-end="780">Gravação personalizada gratuita</strong><br data-start="780" data-end="783" /><strong data-start="786" data-end="821">Frete grátis para todo o Brasil</strong></p>
<p data-start="742" data-end="888">Escolha seu Solitário Ouro Amarelo 18K com a exclusividade que você merece.</p>

<h2><strong>Ficha Técnica -${escapeHtml(fichaTitle)}</strong></h2>
<ul class="description-composition">
  <li class="description-composition__item">Produto: Solitário</li>
</ul>
<ul class="description-composition">
  <li class="description-composition__item">Garantia: 12 meses</li>
</ul>
<ul class="description-composition">
  <li class="description-composition__item">Sugestão: Para Ela</li>
</ul>
<ul class="description-composition">
  <li class="description-composition__item">Ouro: Amarelo 18K 750</li>
</ul>
<ul class="description-composition">
  <li class="description-composition__item">Personalize: A escolha do comprador: Ouro Branco / Ouro Amarelo / Ouro Rose, todos em 18K 750</li>
</ul>
<ul class="description-composition">
  <li class="description-composition__item">Cód: ${codigo}</li>
</ul>
<ul class="description-composition">
  <li class="description-composition__item">Pedras: Diamantes</li>
</ul>
<ul class="description-composition">
  <li>Peso Médio: ${pesoMedio}</li>
</ul>
<ul class="description-composition">
  <li>Largura: ${largura}</li>
</ul>
<ul class="description-composition">
  <li>Altura: ${altura}</li>
</ul>
${giaLine}
<ul class="description-composition">
  <li>Número de Pedras: ${escapeHtml(stoneSummary)}</li>
</ul>
<ul class="description-composition">
  <li>Pontuação do Diamante: ${pontosDiamante}</li>
</ul>
<ul class="description-composition">
  <li>Peso Médio Diamantes: ${pesoMedioDiamantes}</li>
</ul>
<ul class="description-composition">
  <li>Observação: Imagens meramente ilustrativas. Todas as medidas são aproximadas e podem variar de acordo com a produção.</li>
</ul>
`.trim();

  const popup = window.open('', '_blank', 'width=1000,height=800');
  if (!popup) {
    alert('Não foi possível abrir a janela de descrição. Verifique o bloqueador de pop-ups.');
    return;
  }
  popup.opener = null;

  const pageHtml = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Descrição HTML</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #111827; }
          h1 { font-size: 18px; margin: 0 0 10px; }
          p { font-size: 13px; margin: 0 0 12px; color: #4b5563; }
          textarea {
            width: 100%;
            height: 520px;
            font-family: "Courier New", monospace;
            font-size: 12px;
            line-height: 1.5;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: #f9fafb;
          }
          .toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
          button {
            background: #111827;
            color: #ffffff;
            border: none;
            padding: 6px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
          }
          .status { font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>Descrição HTML</h1>
        <p>Copie o HTML abaixo.</p>
        <div class="toolbar">
          <button id="copy-btn">Copiar</button>
          <span id="status" class="status"></span>
        </div>
        <textarea id="descricao-html" readonly></textarea>
        <script>
          const descricaoHtml = ${JSON.stringify(descricaoHtml)};
          const textarea = document.getElementById('descricao-html');
          const status = document.getElementById('status');
          const copyBtn = document.getElementById('copy-btn');
          textarea.value = descricaoHtml;
          copyBtn.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(textarea.value);
              status.textContent = 'Copiado.';
              setTimeout(() => { status.textContent = ''; }, 1500);
            } catch (error) {
              status.textContent = 'Não foi possível copiar.';
            }
          });
          textarea.focus();
          textarea.setSelectionRange(0, 0);
        </script>
      </body>
    </html>
  `;

  popup.document.open();
  popup.document.write(pageHtml);
  popup.document.close();
  popup.focus();
};
