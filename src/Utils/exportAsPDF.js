import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportAsPDF = () => {
    const boxElement = document.getElementById("export-box");

    html2canvas(boxElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 10, 10);
        pdf.save("exported-pdf.pdf");
    });
};

export default exportAsPDF;
