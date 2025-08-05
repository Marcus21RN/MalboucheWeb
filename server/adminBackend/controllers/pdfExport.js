import PDFDocument from 'pdfkit';

export const exportSensorHistoryPDF = (req, res) => {
  const { sensor, data } = req.body;
  if (!sensor || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Datos insuficientes para exportar PDF.' });
  }

  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  let filename = `historico_${sensor}_${Date.now()}.pdf`;
  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  // Header decorativo
  doc.rect(0, 0, doc.page.width, 60).fill('#660152');
  doc.fillColor('#fff').fontSize(22).font('Helvetica-Bold').text(`Histórico de ${sensor.toUpperCase()}`, 0, 20, { align: 'center', width: doc.page.width });
  doc.moveDown(2);
  doc.fillColor('#222').font('Helvetica');

  // Tabla
  let columns = [];
  if (sensor === 'dht11') {
    columns = ['Fecha', 'Hora', 'Temp (°C)', 'Humedad (%)'];
  } else if (sensor === 'ultrasonico') {
    columns = ['Fecha', 'Hora', 'Distancia (cm)'];
  } else if (sensor === 'mlx90614') {
    columns = ['Fecha', 'Hora', 'Temp (°C)'];
  }

  // Tabla: encabezados
  const tableTop = 80;
  const colWidth = (doc.page.width - 120) / columns.length;
  let y = tableTop;
  doc.roundedRect(60, y, doc.page.width - 120, 28, 6).fillAndStroke('#f3e7e9', '#660152');
  doc.fillColor('#660152').font('Helvetica-Bold').fontSize(13);
  columns.forEach((col, i) => {
    doc.text(col, 60 + i * colWidth + 8, y + 8, { width: colWidth - 16, align: 'center' });
  });
  y += 28;

  // Tabla: filas
  doc.font('Helvetica').fontSize(12);
  data.forEach((row, idx) => {
    // Alternar color de fondo
    if (idx % 2 === 0) {
      doc.rect(60, y, doc.page.width - 120, 24).fill('#e3eeff');
    } else {
      doc.rect(60, y, doc.page.width - 120, 24).fill('#fff');
    }
    doc.fillColor('#222');
    let values = [];
    if (sensor === 'dht11') {
      values = [row.fecha, row.hora, row.temperaturaC, row.humedad];
    } else if (sensor === 'ultrasonico') {
      values = [row.fecha, row.hora, row.distanciaCM];
    } else if (sensor === 'mlx90614') {
      values = [row.fecha, row.hora, row.temperaturaC];
    }
    values.forEach((val, i) => {
      doc.text(String(val ?? ''), 60 + i * colWidth + 8, y + 7, { width: colWidth - 16, align: 'center' });
    });
    // Bordes inferiores
    doc.moveTo(60, y + 24).lineTo(doc.page.width - 60, y + 24).stroke('#ccc');
    y += 24;
    // Salto de página si es necesario
    if (y > doc.page.height - 60) {
      doc.addPage();
      y = tableTop;
    }
  });

  // Pie de página
  doc.fillColor('#aaa').fontSize(10).text(`Exportado: ${new Date().toLocaleString()}`, 60, doc.page.height - 40, { align: 'left' });
  doc.fillColor('#aaa').fontSize(10).text('Malbouche IoT Dashboard', 0, doc.page.height - 40, { align: 'right', width: doc.page.width - 60 });

  doc.end();
};
