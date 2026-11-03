import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const BRAND_CRIMSON = [222, 29, 58]; // #DE1D3A
const TEXT_DARK = [17, 24, 39]; // #111827
const TEXT_MUTED = [107, 114, 128]; // #6B7280
const BORDER_COLOR = [229, 231, 235]; // #E5E7EB

/**
 * Formats ISO date string into readable Date & Time for PDF
 */
const formatPdfDateTime = (dateVal) => {
  if (!dateVal) return { date: '—', time: '—' };
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return { date: '—', time: '—' };
    const date = d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const time = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return { date, time };
  } catch (e) {
    return { date: '—', time: '—' };
  }
};

/**
 * Generates and downloads an executive-ready, branded PDF report for Product Activity
 */
export function generateProductActivityPdf({
  reportData,
  selectedMonthName,
  adminUser,
}) {
  if (!reportData) return;

  const { summary = {}, activities = [], period = {}, trackingMetadata = {} } = reportData;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // --- Top Decorative Crimson Brand Bar ---
  doc.setFillColor(...BRAND_CRIMSON);
  doc.rect(0, 0, pageWidth, 6, 'F');

  // --- Company Header ---
  let y = 35;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...TEXT_DARK);
  doc.text('COBOLT MACHINERIES', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Industrial & Commercial Machinery Solutions | Kerala, India', margin, y + 13);

  // Right-aligned report title & period
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_CRIMSON);
  doc.text('PRODUCT ACTIVITY REPORT', pageWidth - margin, y - 2, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_DARK);
  const periodLabel = period.monthName || selectedMonthName || 'Monthly Audit';
  doc.text(`Period: ${periodLabel}`, pageWidth - margin, y + 11, { align: 'right' });

  const generatedAt = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  const adminName = adminUser?.name || adminUser?.email || 'Authorized Administrator';
  doc.text(`Generated: ${generatedAt} by ${adminName}`, pageWidth - margin, y + 23, { align: 'right' });

  y += 35;

  // Horizontal separator
  doc.setDrawColor(...BORDER_COLOR);
  doc.setLineWidth(0.75);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // --- Executive KPI Summary Cards (5 columns) ---
  const cards = [
    { label: 'TOTAL ACTIVITIES', value: String(summary.totalActivities || 0), color: BRAND_CRIMSON },
    { label: 'PRODUCTS ADDED', value: String(summary.creates || 0), color: [16, 185, 129] }, // emerald
    { label: 'MODIFICATIONS', value: String(summary.updates || 0), color: [59, 130, 246] }, // blue
    { label: 'REMOVALS', value: String(summary.deletes || 0), color: [239, 68, 68] }, // red
    { label: 'PRODUCTS AFFECTED', value: String(summary.uniqueProductsAffected || 0), color: [139, 92, 246] }, // purple
  ];

  const cardGap = 8;
  const cardWidth = (contentWidth - cardGap * (cards.length - 1)) / cards.length;
  const cardHeight = 44;

  cards.forEach((card, i) => {
    const x = margin + i * (cardWidth + cardGap);

    // Card background
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(x, y, cardWidth, cardHeight, 4, 4, 'F');
    doc.setDrawColor(...BORDER_COLOR);
    doc.roundedRect(x, y, cardWidth, cardHeight, 4, 4, 'S');

    // Accent line at top of card
    doc.setFillColor(...card.color);
    doc.roundedRect(x, y, cardWidth, 3, 2, 2, 'F');

    // Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...TEXT_DARK);
    doc.text(card.value, x + cardWidth / 2, y + 22, { align: 'center' });

    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(card.label, x + cardWidth / 2, y + 35, { align: 'center' });
  });

  y += cardHeight + 14;

  // --- Audit Scope & Historical Notice ---
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, contentWidth, 26, 4, 4, 'F');
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(margin, y, contentWidth, 26, 4, 4, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_DARK);
  doc.text('AUDIT INTEGRITY & DATA SCOPE:', margin + 10, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  const scopeText = trackingMetadata.isHistoricalBaseline
    ? 'This period precedes the activation of audit tracking (Activated: Nov 3, 2026). Prior items remain in the baseline inventory; past edit events are not retroactively synthesized.'
    : 'Real-time database tracking active. Records reflect authentic catalog operations with available administrator attribution (unattributed entries marked accordingly).';
  doc.text(scopeText, margin + 145, y + 11, { maxWidth: contentWidth - 155 });

  y += 36;

  // --- Category Activity Breakdown (if available) ---
  if (Array.isArray(summary.topCategories) && summary.topCategories.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text('CATEGORY BREAKDOWN:', margin, y);

    let catX = margin + 120;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const catSnippets = summary.topCategories.slice(0, 4).map((c) => `${c.category} (${c.count})`);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(catSnippets.join('   |   '), catX, y);
    y += 14;
  }

  // --- Activity Table ---
  const tableData = activities.map((act, index) => {
    const dt = formatPdfDateTime(act.timestamp);
    const timeDisplay = `${dt.date}\n${dt.time}`;

    const productDisplay = `${act.productName || 'Unnamed'}\n[ID: ${act.productId || '—'}]`;
    const categoryDisplay = act.category || 'General';

    // Action format
    let actionBadge = act.action || 'ACTIVITY';
    if (act.action === 'CREATE') actionBadge = 'ADDED';
    else if (act.action === 'UPDATE') actionBadge = 'UPDATED';
    else if (act.action === 'STATUS_CHANGE') actionBadge = 'STATUS';
    else if (act.action === 'PHOTOS_UPDATE') actionBadge = 'PHOTOS';
    else if (act.action === 'DELETE') actionBadge = 'REMOVED';

    // Attribution
    let attributionDisplay = 'Attribution Unavailable';
    if (act.performedBy && act.performedBy.isAvailable) {
      attributionDisplay = act.performedBy.name || act.performedBy.email || 'Admin';
      if (act.performedBy.role) {
        attributionDisplay += ` (${act.performedBy.role})`;
      }
    }

    // Details snippet
    let detailsDisplay = act.actionLabel || '';
    if (act.details) {
      if (Array.isArray(act.details.changedFields) && act.details.changedFields.length > 0) {
        detailsDisplay += `\nFields: ${act.details.changedFields.join(', ')}`;
      }
      if (act.details.price !== undefined && act.details.price !== null) {
        detailsDisplay += `\nPrice: Rs ${Number(act.details.price).toLocaleString('en-IN')}`;
      }
    }

    return [
      String(index + 1),
      timeDisplay,
      productDisplay,
      categoryDisplay,
      actionBadge,
      attributionDisplay,
      detailsDisplay.trim(),
    ];
  });

  if (tableData.length === 0) {
    // Empty state table row
    tableData.push([
      '—',
      '—',
      'No activity recorded for this period.',
      '—',
      '—',
      '—',
      trackingMetadata.isHistoricalBaseline
        ? 'Historical catalog baseline period (Tracking started Nov 2026).'
        : 'No product modifications logged for selected filters.',
    ]);
  }

  const tableOptions = {
    startY: y,
    head: [['#', 'Date & Time', 'Product Name & Slug', 'Category', 'Action', 'Admin Attribution', 'Details & Notes']],
    body: tableData,
    margin: { left: margin, right: margin, bottom: 45 },
    styles: {
      fontSize: 8,
      cellPadding: 6,
      textColor: TEXT_DARK,
      valign: 'middle',
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [31, 41, 55], // #1F2937 dark slate
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
    columnStyles: {
      0: { cellWidth: 20, halign: 'center' },
      1: { cellWidth: 70 },
      2: { cellWidth: 120, fontStyle: 'bold' },
      3: { cellWidth: 80 },
      4: { cellWidth: 55, halign: 'center', fontStyle: 'bold' },
      5: { cellWidth: 85 },
      6: { cellWidth: 85 },
    },
    didParseCell: (data) => {
      // Style action badges
      if (data.section === 'body' && data.column.index === 4) {
        const text = data.cell.text[0];
        if (text === 'ADDED') data.cell.styles.textColor = [16, 185, 129];
        else if (text === 'UPDATED') data.cell.styles.textColor = [59, 130, 246];
        else if (text === 'STATUS') data.cell.styles.textColor = [217, 119, 6];
        else if (text === 'PHOTOS') data.cell.styles.textColor = [139, 92, 246];
        else if (text === 'REMOVED') data.cell.styles.textColor = [239, 68, 68];
      }
      // Style Attribution
      if (data.section === 'body' && data.column.index === 5) {
        if (data.cell.text[0]?.includes('Unavailable')) {
          data.cell.styles.textColor = TEXT_MUTED;
          data.cell.styles.fontStyle = 'italic';
        }
      }
    },
    didDrawPage: (data) => {
      // Footer on every page
      const currentYear = new Date().getFullYear();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...TEXT_MUTED);

      doc.setDrawColor(...BORDER_COLOR);
      doc.line(margin, pageHeight - 30, pageWidth - margin, pageHeight - 30);

      doc.text(
        `Cobolt Machineries Private Limited — Executive Product Audit Report (C) ${currentYear}`,
        margin,
        pageHeight - 18
      );

      const pageStr = `Page ${doc.internal.getNumberOfPages()}`;
      doc.text(pageStr, pageWidth - margin, pageHeight - 18, { align: 'right' });
    },
  };

  if (typeof autoTable === 'function') {
    autoTable(doc, tableOptions);
  } else if (typeof doc.autoTable === 'function') {
    doc.autoTable(tableOptions);
  } else if (autoTable && typeof autoTable.default === 'function') {
    autoTable.default(doc, tableOptions);
  } else if (autoTable && typeof autoTable.autoTable === 'function') {
    autoTable.autoTable(doc, tableOptions);
  }

  // Save the PDF
  const cleanMonth = (period.monthName || selectedMonthName || 'Monthly_Report').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `Cobolt_Product_Activity_Report_${cleanMonth}.pdf`;
  doc.save(filename);
}
