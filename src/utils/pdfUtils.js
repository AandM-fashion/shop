import { jsPDF } from 'jspdf';

export const generatePDF = (orderId) => {
  const pdfDoc = new jsPDF();

  // Set font size for the document
  pdfDoc.setFontSize(14);

  // Set initial y position
  let y = 20;

  // Add order summary heading
  pdfDoc.text('Order Summary', 105, y, { align: 'center' });

  // Increment y position
  y += 10;

  // Add order ID
  pdfDoc.setFont('helvetica', 'bold');
  pdfDoc.text(`Order ID: ${orderId}`, 105, y, { align: 'center' });

  // Increment y position
  y += 10;

  // Add line separator
  pdfDoc.setDrawColor(0);
  pdfDoc.setLineWidth(0.5);
  pdfDoc.line(20, y, 190, y);

  // Increment y position
  y += 10;

  // Add order details
  pdfDoc.setFont('helvetica', 'normal');
  pdfDoc.text('Order Details', 20, y);

  // Increment y position
  y += 10;

  // Fetch and add order details from the database or Redux state
  // Example:
  // pdfDoc.setFont('helvetica', 'normal');
  // pdfDoc.text(`Name: John Doe`, 20, y);
  // y += 10;
  // pdfDoc.text(`Email: john.doe@example.com`, 20, y);
  // y += 10;
  // ...

  // Save the document
  return pdfDoc;
};
