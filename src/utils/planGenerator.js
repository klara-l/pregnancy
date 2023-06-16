import jsPDF from "jspdf";
import "jspdf-autotable";

const appointmentDescription = {
  "week-10": "1. Ultraschall, Vergabe Schwangerschaftspass, ggf. Blutentnahme (Toxoplasmose/CMV)",
  "week-14": "Ultraschall, wenn keine frühe Feindiagnostik erfolgt ist.",
  "week-16": "Besprechen Befund frühe Feindiagnostik",
  "week-20": "2. Ultraschall, ggf. Blutentnahme (Kontrolle Toxoplasmose/CMV, Bestimmung fetaler Rhesus-Faktor)",
  "week-25": "50g-Zuckertest, Blutentnahme (2. Antikörpertest, kleines Blutbild)",
  "week-30": "3. Ultraschall, Impfung Keuchhusten",
  "week-33": "Blutentnahme (kleines Blutbild, ggf. Kontrolle Toxoplasmose/CMV), ggf. CTG",
  "week-36": "Ultraschall Wachstumskontrolle, ggf. B-Streptokokken-Abstrich, ggf. CTG",
  "week-37": "Geburtsplanung, ggf. CTG",
  "week-38": "Geburtsplanung, ggf. CTG",
  "week-39": "Geburtsplanung, ggf. CTG",
  "birthdate": "Ultraschall Fruchtwasser, ggf. CTG",
  "control-appointment": " Nachsorge"
};

// define a generatePDF function that accepts appointments
const generatePDF = (pregnancy, appointments) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Wann", "Termin", "Was wird gemacht?"];

  const tableRows = appointments.map(appointment => [
      appointment.readableId + "\n(" + appointment.description + ")",
      "",
      appointmentDescription[appointment.id] ?? ""
    ]);


  // startY is basically margin-top

  doc.setFontSize(30);
  doc.text("Schwangerschaftsplaner", 15, 18);
  doc.setFontSize(16);
  doc.text(["Erster Tag letzte Regel: " + pregnancy.periodDate, 
    "Korrektur: " + pregnancy.periodAdjustment + " Tage", 
    "Errechneter Geburtstermin: " + pregnancy.birthDate], 15, 28);
  doc.setProperties({
    title: "Schwangerschaftsplaner"
});


  const img = new Image();
 img.src = `${process.env.PUBLIC_URL}/logo-praxis-nova.png`;
doc.addImage(img, 'PNG', 145, 10, 35, 35);

  doc.autoTable(tableColumn, 
    tableRows, 
    {
      startY: 50,
      headStyles :{textColor: [255, 255, 255],fillColor : [77, 148, 160]}, // table header color: #4d94a0
      theme: 'grid',
      columnStyles: {
          0: {
                cellWidth: 50,
              },
          1: {
                cellWidth: 50,

             },
          2: {
                cellWidth: 80,
             }
      }
    });

doc.setFontSize(9);
doc.text(["Gyn-Praxis Nova, www.praxisnova-berlin.de"], 70, 290);

  window.open(doc.output('bloburl'));

};

export default generatePDF;
