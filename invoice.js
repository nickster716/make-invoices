// left side form

let billTo= document.querySelector(".billTo"); // in input box
let itemName= document.querySelector(".itemName");  //input box
let Quantity= document.querySelector(".Quantity");  //input box
let price= document.querySelector(".Price");  //input box
let Description= document.querySelector(".Description");  //input box
let sellerNote= document.querySelector(".sellerNote");  //input box

let billFrom= document.querySelector(".billFrom");  //input box
let invoiceNumber= document.querySelector(".invoiceNumber");  //input box
let invoiceDate= document.querySelector(".invoiceDate");  //input box
let subTotal= document.querySelector(".subtotal"); // in span tag
let discount= document.querySelector(".discount");  //input box
let otherAmount= document.querySelector(".otherAmount"); //input box
let total= document.querySelector(".total"); // in span tag

let sendButton = document.querySelector(".sendInvoice");

// creating and saving pdf part

// importing jspdf
const { jsPDF }= window.jspdf;


sendButton.addEventListener("click",generatepdf);

function generatepdf(){
    // generating pdf
    const doc = new jsPDF();

    doc.setFont("helvetica","bold");
    doc.setFontSize(40);
    const textwidth = doc.getTextWidth("INVOICE");
    doc.text("INVOICE",210-textwidth-10,20);

    
    doc.setFontSize(20);
    doc.text(`${billFrom.value}`,210- doc.getTextWidth(billFrom.value)-10, 35);

    doc.setFontSize(15);

    doc.setFillColor(255, 245, 230);
    doc.rect(10,45, 190,40, "F");

    doc.text(`Invoice no: ${invoiceNumber.value}`, 15, 57);
    doc.text(`Invoice date: ${invoiceDate.value}`, 15, 67);

    doc.setFontSize(25);
    doc.text(`${total.textContent}`,200- doc.getTextWidth(total.textContent)-5,67);

    doc.setFontSize(17);
    doc.text(`AMOUNT DUE`,200- doc.getTextWidth("AMOUNT DUE")-5,78);

    doc.text("BILL TO",15,100);
    doc.setFontSize(15);
    doc.setFont("helvetica","normal");
    doc.text(`${billTo.value}`,15,110);

    doc.setFont("helvetica","bold");
    doc.setFontSize(17);
    doc.text("ITEMS AND DESCRIPTION",15,125, {
        maxWidth: 100,
        lineHeightFactor: 1.5
    });

    doc.text("QTY",120,125, {
        maxWidth:20
    });

    doc.text("PRICE",140,125, {
        maxWidth:20
    });

    doc.text("AMOUNT",165,125, {
        maxWidth:30
    });

    doc.line(10,128, 200,128);

    doc.setFontSize(15);
    doc.setFont("helvetica","normal");

    doc.text(`${itemName.value}`,15,135, {
        maxWidth: 100,
        lineHeightFactor: 1.1
    })

    doc.text(`${Description.value}`,15,145, {
        maxWidth: 100,
        lineHeightFactor: 1.1
    })

    doc.text(`${Quantity.value}`,120,135);
    doc.text(`${price.value}`,140,135);
    doc.text(`${total.textContent}`,175,135);

    doc.text("Subtotal",120,260);
    doc.text(`${subTotal.textContent}`,175,260);

    doc.setFont("helvetica","bold");

    doc.text("TOTAL",120,270);
    doc.text(`${total.textContent}`,175,270);

    doc.save("invoice.pdf");
}

price.addEventListener("keyup",updateValue);
Quantity.addEventListener("keyup",updateValue);

function updateValue(){
    subTotal.textContent= parseInt(price.value)* parseInt(Quantity.value) +"$";
    let finalval= parseInt(subTotal.textContent) - parseInt(discount.value) + parseInt(otherAmount.value);
    total.textContent= finalval+"$"
}

discount.addEventListener("keyup",updatetotal);
otherAmount.addEventListener("keyup",updatetotal);


function updatetotal(){
    let finalval= parseInt(subTotal.textContent) - parseInt(discount.value) + parseInt(otherAmount.value);
    total.textContent= finalval+"$"
}


// implementing custom modal



const customAlert = document.getElementById('customAlert');
const okButton = document.getElementById('okButton');

// Show the modal when "Send Invoice" button is clicked
sendButton.addEventListener('click', function (event) {
    event.preventDefault();
    customAlert.classList.remove('hidden'); // Show the modal
});

// Hide the modal when "OK" button is clicked
okButton.addEventListener('click', function () {
    customAlert.classList.add('hidden'); // Hide the modal
});


