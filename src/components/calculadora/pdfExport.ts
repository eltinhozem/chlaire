import type { Supplier } from './fornecedor';
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
  product
}: CalculationPdfOptions) => {
  const goldFormula = `${goldWeight.toFixed(2)}g × R$ ${goldPrice18k.toFixed(2)}/g × margem ${margin.toFixed(2)} = R$ ${goldValue.toFixed(2)}`;
  const stonesFormula =
    stones.length === 0
      ? 'Sem pedras'
      : stones
          .map((s) => {
            const basePrice = getStonePriceByMm(s.sizeMm, supplier.prices);
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
            const basePrice = getStonePriceByMm(s.sizeMm, supplier.prices);
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
  let jsPDFLib: typeof import('jspdf').jsPDF;
  try {
    ({ jsPDF: jsPDFLib } = await import('jspdf'));
  } catch (error) {
    console.error('Erro ao carregar jsPDF:', error);
    alert('Não foi possível carregar o gerador de PDF.');
    return;
  }

  const pdf = new jsPDFLib({ unit: 'pt', format: 'a4' });
  const left = 48;
  let y = 60;
  const line = (text: string, size = 12, gap = 12) => {
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(text, 520);
    pdf.text(lines, left, y);
    y += lines.length * (size + 2) + gap - 2;
  };
  const bullet = (text: string) => line(`• ${text}`, 12, 6);

  const codigo = txtFolderCode || '-';
  const pesoMedio = `${goldWeight.toFixed(2)} g`;
  const largura = parsedWidth ? `${parsedWidth.toFixed(2)} mm` : '-';
  const altura = parsedHeight ? `${parsedHeight.toFixed(2)} mm` : '-';

  const stoneSummary = stones.length
    ? stones.map((s) => `${s.quantity} de ${s.sizeMm.toFixed(1)}mm`).join(' / ')
    : 'Sem pedras';

  const totalPoints = stones.reduce((sum, s) => {
    const conv = findConversionByMm(s.sizeMm);
    return sum + (conv?.points || 0) * s.quantity;
  }, 0);
  const totalCt = stones.reduce((sum, s) => sum + (s.ct || 0) * s.quantity, 0);

  const pontosDiamante = `Total de ${totalPoints.toFixed(2)} pontos`;
  const pesoMedioDiamantes = `Média de ${totalCt.toFixed(3)} ct`;

  pdf.setFontSize(18);
  pdf.text('Descrição e Composição', left, y);
  y += 28;

  pdf.setFontSize(13);
  pdf.text('Gravação personalizada gratuita', left, y);
  y += 18;
  pdf.text('Frete grátis para todo o Brasil', left, y);
  y += 28;

  pdf.setFontSize(16);
  pdf.text('Ficha Técnica – Anel Solitário Ouro 18k', left, y);
  y += 22;

  bullet('Produto: Anel Solitário');
  bullet('Garantia: 12 meses');
  bullet('Sugestão: Para Ela');
  bullet('Ouro: Amarelo 18K 750');
  bullet('Personalize: A escolha do comprador: Ouro Branco / Ouro Amarelo / Ouro Rose, todos em 18K 750');
  bullet(`Cód.: ${codigo}`);
  bullet('Pedras: Diamantes');
  bullet(`Peso Médio: ${pesoMedio}`);
  bullet(`Largura: ${largura}`);
  bullet(`Altura: ${altura}`);
  bullet(`Número de Pedras: ${stoneSummary}`);
  bullet(`Pontuação do Diamante: ${pontosDiamante}`);
  bullet(`Peso Médio Diamantes: ${pesoMedioDiamantes}, de acordo com a numeração feminina`);
  bullet('Observação: Valor referente ao par de alianças. Imagens meramente ilustrativas. Todas as medidas são aproximadas e podem variar de acordo com a produção.');

  const fileName = `descricao-${codigo || 'joia'}.pdf`;
  pdf.save(fileName);
};
