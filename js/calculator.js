const divResult = document.getElementById("price_final");
const calculatorBtn = document.getElementById("calculatorBtn");
const totalSpace = document.getElementById("totalSpace");
const height = document.getElementById("height");
const bulbs = document.getElementById("bulbs");
const outlet = document.getElementById("outlet");
const water = document.getElementById("water");
const heatedFloor = document.getElementById("heatedFloor");
const usi = document.getElementById("doors");
const price_final = document.getElementById("price_final");
const planID = document.getElementById("planID");
const contact_name = document.getElementById("calculatorName");
const contact_email = document.getElementById("calculatorEmail");
const phone = document.getElementById("calculatorPhone");
const echidaBtn = document.getElementById("echidaBtn");
const contacteazaneBTN = document.getElementById("contacteazaneBTN");

const phone2 = document.getElementById("application_tel");
const name2 = document.getElementById("application_name");
const email3 = document.getElementById("email");
const tel3 = document.getElementById("tel");
const name3 = document.getElementById("name");
const regex_phone = /^0\d{8}$/;
const regex_name = /^[A-Z][a-z]+(?:[ '-][A-Za-z]+)*$/;
const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const contact_name = document.getElementById("validation_error_name");
// const contact_email = document.getElementById("validation_error_phone");
// const validation_error_email = document.getElementById("validation_error_email");

let phoneOk = false;
let nameOk = false;
let emailOk = false;

// =========== FORM VALIDATION START =========== 
phone.addEventListener("input", (e) => {
    e.preventDefault();
    if (!regex_phone.test(phone.value)) {
        phoneOk = false;
        // validation_error_phone.style.display = 'flex';
    }
    else {
        // validation_error_phone.style.display = 'none';
        phoneOk = true;
    }
});

// contact_name.addEventListener("input", (e) => {
//     e.preventDefault();
//     if(!regex_name.test(contact_name.value)){
//         nameOk = false;
//         // validation_error_name.style.display = 'flex';
//     }
//     else {
//         // validation_error_name.style.display = 'none';
//         nameOk = true;
//     }
// });

contact_email.addEventListener("input", (e) => {
    e.preventDefault()
    if (!regex_email.test(contact_email.value)) {
        emailOk = false;
        // validation_error_email.style.display = 'flex';
    }
    else {
        // validation_error_email.style.display = 'none';
        emailOk = true;
    }
});
// =========== FORM VALIDATION END =========== 

// =========== SEND EMAIL START =========== 
function sendEmail(finalPrice, suprafataPereti, suprafataPodea, perimetru) {
    let message = `Total: ${parseInt(finalPrice)}}eur 
                \n Plan: ${planID.value}
                \n Suprafata totala al apartamentului: ${totalSpace.value} m2
                \n Inaltimea al apartamentului: ${height.value} m2
                \n Perimetru: ${perimetru} m2
                \n Suprafata pereti: ${suprafataPereti} m2
                \n Suprafata podea: ${suprafataPodea} m2
                \n Nr corpurilor de iluminat: ${bulbs.value} buc.
                \n Nr prizelor si intrerupatoarelor: ${outlet.value} buc.
                \n Puncte apa si canaliare: ${water.value} unit.
                \n Suprafata Podea calda: ${heatedFloor.value} m2
                \n Nr usi: ${usi.value} buc.
                `;
    const params = {
        from_name: contact_name.value,
        email_id: contact_email.value,
        message: message,
        clientName: contact_name.value,
        phone_number: phone.value
    }

    emailjs.send('service_8spjjfk', 'template_ym8naii', params).then(
        (response) => {

        },
        (error) => {
            window.alert('A aparut o eroare in timpul transmiterii mesajului dvs, va rugam incerca-ti mai tarziu...', error);
        },
    );
}

calculatorBtn.addEventListener('click', (e) => {
    e.preventDefault();
    debugger;
    if (validator()) {
        let perimetru = totalSpace.value * 1.2;
        let suprafataPereti = perimetru * height.value;
        let suprafataPodea = parseFloat(totalSpace.value);
        let suprafataTavan = parseFloat(totalSpace.value);
        let suprafataBaie = 100;

        // pretul lucrarile executate si numarul executat
        let lucrariDemolare = (suprafataPereti + suprafataPodea + suprafataTavan) * 120;
        // Pregatire suprafete pentru lucru						
        let zidarie = suprafataPodea * 0.2 * 120;
        let curatireSuprafata = (suprafataPereti + suprafataPodea + suprafataTavan) * 12;
        let amorsareSuprafata = (suprafataPereti + suprafataPodea + suprafataTavan) * 12;
        let nivelarePereti = suprafataPereti * 150;
        let aplicareGlet = (suprafataPereti + suprafataPodea) * 50;
        let nivelarePodea = suprafataPodea * 200;
        let slefuire = (suprafataPereti + suprafataPodea) * 25;
        let totalPregatire = lucrariDemolare + zidarie + curatireSuprafata + amorsareSuprafata + nivelarePereti + aplicareGlet + nivelarePodea + slefuire;

        // Apa si canalizarea	
        let lucrariApaCanalizareMurdar = water.value * 1500;
        let podeleCalde = heatedFloor.value * 400;
        let totalWater = lucrariApaCanalizareMurdar + podeleCalde;

        // Lucrari cu electricitatea						
        let electricMurdar = 220 * 105;
        let executrareCanal = 40 * 80;
        let montareCutie = 1200;
        let asamblareCutie = 140 * 60;
        let montareDuze = 25 * 90;
        let astupareRosturiTrasare = 30 * 80;
        let totalElectricity = electricMurdar + executrareCanal + montareCutie + asamblareCutie + montareDuze + astupareRosturiTrasare;
        //let totalElectricity = bulbs * 220 + 3200 + 1200 + 8400 + outlet * 25 + bulbs * 30;

        // Montare teracota						
        let hidroizolare = 120 * suprafataBaie;
        let montareTeracota = 500 * suprafataBaie;
        let montareDecoratiuniTeracota = 1000
        let totalTeracota = hidroizolare + montareTeracota + montareDecoratiuniTeracota;

        // Pregatirea pentru vopsea						
        let ghipsocarton = suprafataTavan * 180;
        let amorsareRosturi = suprafataTavan * 30;
        let astupareRosturi = suprafataTavan * 90;
        let amorsareFibraSticlaTavan = suprafataTavan * 15;
        let amorsareFibraSticlaPereti = suprafataPereti * 15;
        let aplicareFibraSticlaTavan = suprafataTavan * 70;
        let aplicareFibraSticlaPereti = suprafataPereti * 70;
        let gletuireTavan = suprafataTavan * 120;
        let gletuireSuprafeteVopsite = (suprafataPereti - suprafataBaie) * 120;
        let gletuireSubTapete = suprafataPereti * 45 * 0;
        let montareBagheteTavan = perimetru * 100;
        let montarePlinteAscunse = perimetru * 200 * 0;
        let montareMoldinguriGips = 100 * 0;
        let montareDecoratiuni = 400 * 0;
        let slefuireTavan = 25 * suprafataTavan;
        let slefuirePereti = 25 * suprafataPereti;
        let amorsareSuprafataVopsire = (suprafataPereti + suprafataPodea + suprafataTavan) * 15;
        let totalPregatireVopsea = ghipsocarton + amorsareRosturi + astupareRosturi + amorsareFibraSticlaPereti + amorsareFibraSticlaTavan +
            aplicareFibraSticlaPereti + aplicareFibraSticlaTavan + gletuireTavan + gletuireSuprafeteVopsite + gletuireSubTapete +
            montareBagheteTavan + montarePlinteAscunse + montareMoldinguriGips + montareDecoratiuni + slefuireTavan + slefuirePereti + amorsareSuprafataVopsire;

        // Finisarea lucrarilor						
        let vopsirePereti = 120 * suprafataPereti;
        let vopsireTavan = 160 * suprafataTavan;
        let montareTapeta = 100 * 0 * suprafataPereti;
        let montarePrize = 50 * outlet.value;
        let montareCorpuriIlumintate = 200 * bulbs.value;
        let montareLeduri = 100 * 10;
        let montareObiecteSanitare = water.value / 2 * 100;
        let montareUsi = 1400 * usi.value;
        let totalFinisareLucrari = vopsirePereti + vopsireTavan + montareTapeta + montarePrize + montareCorpuriIlumintate + montareLeduri +
            montareObiecteSanitare + montareUsi;

        let totalCosturi = totalPregatire + totalWater + totalElectricity + totalTeracota + totalPregatireVopsea + totalFinisareLucrari;
        let total = totalCosturi / 85;

        let capital = parseInt(total) / 19.1;
        let inoire = capital * 0.5;
        let cosmetic = capital * 0.8;
        let individual = capital + capital * 0.3;

        let finalPrice;

        if (planID.value === 'capital') finalPrice = parseInt(capital);
        else if (planID.value === 'inoire') finalPrice = parseInt(inoire);
        else if (planID.value === 'cosmetic') finalPrice = parseInt(cosmetic);
        else finalPrice = parseInt(individual);

        if (totalSpace.value == 0) finalPrice = 0;
        // else finalPrice = finalPrice / totalSpace.value;

        price_final.innerHTML = `<p>Pret Final: <strong class="calcprice">${finalPrice}€</strong> per m<sup>2</sup></p>`;
        sendEmail(finalPrice, suprafataPereti, suprafataPodea, perimetru);



        // Create Excel file
        let ws_data = [
            ['Suprafata totala al apartamentului', totalSpace.value, 'm2'],
            ['Inaltimea', height.value, 'm2'],
            ['Perimetru', perimetru, 'm'],
            ['Suprafata Pereti', suprafataPereti, 'm2'],
            ['Suprafata Podea', suprafataPodea, 'm2'],
            ['Suprafata Tavan', suprafataTavan, 'm2'],
            ['Suprafata Baie', suprafataBaie, 'm2'],
            ['Electricitate'],
            ['Numarul corpurilor de iluminat', bulbs.value, 'buc'],
            ['Numarul prizelor si intrerupatoarelor', outlet.value, 'buc'],
            ['Apa si canalizare'],
            ['Puncte apa si canalizare', water.value, 'unit'],
            ['Suprafata Podea calda', heatedFloor.value, 'm2'],
            ['Nr. usi', usi.value, 'buc'],
            ['Final Price', finalPrice],
            [''],
            ['Pretul lucrarile executate si numarul executat', 'Pretul', 'Nr. Executii', 'Tip reparatie', 'Total'],
            ['Lucrari de demontare', 120, 1.00, 'Capital', { f: 'SUM(B5:B7)*B19' }],
            [''],
            ['Pregatire suprafete pentru lucru'],
            ['Zidaria', 120, 1, '', zidarie],
            ['Curatarea suprafetelor', 12, 1, 'toate', curatireSuprafata],
            ['Amorsarea suprafetelor', 12, 1, 'toate', amorsareSuprafata],
            ['Nivelarea peretilor', 150, 1, 'in afara de cosmetica', nivelarePereti],
            ['Aplicare glet pentru fibra de sticla', 50, 1, 'cu exceptia la tapete', aplicareGlet],
            ['Nivlare podea', 200, 1, '', nivelarePodea],
            ['Slefuirea suprafetelor', 25, 1, 'toate', slefuire],
            ['Total etapa murdara', '', '', '', totalPregatire],
            [''],
            ['Apa si canalizarea'],
            ['Lucrari apa si canalizarea(etapa murdara) incluse', 1500, 15, 'toate', lucrariApaCanalizareMurdar],
            ['Podele calde', 400, 1, 'Capital', podeleCalde],
            ['Total etapa murdara apa si canalizarea', '', '', '', totalWater],
            [''],
            ['Lucrari cu electricitatea'],
            ['Etapa murdara electricitate puncte', 220, 105, '', electricMurdar],
            ['Executare canal pentru cablu', 40, 80, '', executrareCanal],
            ['Montare cutie automete', 1200, 1, '', montareCutie],
            ['Asamblare cutia cu automete 60 module', 140, 60, '', asamblareCutie],
            ['Montare duze pentru prize intrerupatoare', 25, 90, '', montareDuze],
            ['Astuparea rosturilor dupa trasare', 30, 80, '', astupareRosturiTrasare],
            ['Total etapa murdara electricitate', '', '', '', totalElectricity],
            [''],
            ['Montare teracota'],
            ['Aplicare hidroizolare', 60, 2, '', hidroizolare],
            ['Montare teracota pina la 1,2m x 1,2m', 500, 1, '', montareTeracota],
            ['Montare decoratiuni teracota', 1000, 1, '', montareDecoratiuniTeracota],
            [' '],
            ['Pregatirea pentru vopsea'],
            ['Montare tavane gipscarton (intrun nivel)', 180, 1, '', ghipsocarton],
            ['Amorsarea rosturilor', 10, 285, '', amorsareRosturi],
            ['Astuparea rosturilor si armarea acestora', 30, 285, '', astupareRosturi],
            ['Amorsarea suprafetelor pentru fibra de sticla tavane', 15, 1, '', amorsareFibraSticlaTavan],
            ['Amorsarea suprafetelor pentru fibra de sticla pereti', 15, 1, '', amorsareFibraSticlaPereti],
            ['Aplicarea fibrei de sticla tavane', 70, 1, '', aplicareFibraSticlaTavan],
            ['Aplicarea fibrei de sticla pereti', 70, 1, '', aplicareFibraSticlaPereti],
            ['Gletuirea tavanelor', 60, 2, '', gletuireTavan],
            ['Gletuirea suprafetelor care vor fi vopsite', 60, 2, '', gletuireSuprafeteVopsite],
            ['Gletuirea suprafetelor sub tapete', 45, 0, '', gletuireSubTapete],
            ['Montarea baghete tavane', 100, 1, '', montareBagheteTavan],
            ['Montarea plintelor ascunse', 200, 0, '', montarePlinteAscunse],
            ['Montare moldinguri gips', 100, '', '', montareMoldinguriGips],
            ['Montarea decoratiunilor', 400, '', '', montareDecoratiuni],
            ['Slefuirea suprafetelor tavan', 25, 1, '', slefuireTavan],
            ['Slefuirea suprafetelor pereti', 25, 1, '', slefuirePereti],
            ['Amorsarea suprafetelor pentru vopsea', 15, 1, '', amorsareSuprafataVopsire],
            ['Total pregatirea vopsea', '', '', '', totalPregatireVopsea],
            [' '],
            ['Finisarea lucrarilor'],
            ['Vopsirea peretilor', 60, 2, '', vopsirePereti],
            ['Vopsirea tavanelor', 80, 2, '', vopsireTavan],
            ['Montare tapete', 100, 0, '', montareTapeta],
            ['Montarea prizelor /intrerupatoarelor', 50, 120, '', montarePrize],
            ['Montarea corpurilor de iluminat', 200, 40, '', montareCorpuriIlumintate],
            ['Montare leduri', 100, 10, '', montareLeduri],
            ['Montarea obiectelor sanitare', 500, 7.5, '', montareObiecteSanitare],
            ['Montare usi', 1400, 5, '', montareUsi],
            ['Total Finisare', '', '', '', totalFinisareLucrari],
            ['Costuri totale pachet'],
            ['Înoire', '', '', '', inoire],
            ['Cosmetic', '', '', '', cosmetic],
            ['Capital', '', '', '', capital],
            ['Individual', '', '', '', individual],
            ['Pret per m2 pentru lucrarile dvs', '', '', '', finalPrice],
        ];

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(ws_data);

        // Set column widths
        ws['!cols'] = [
            { wch: 40 },
            { wch: 15 },
            { wch: 15 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 }
        ];

        // Apply text wrapping and bold style to cells
        for (let i = 0; i < ws_data.length; i++) {
            for (let j = 0; j < ws_data[i].length; j++) {
                let cell_ref = XLSX.utils.encode_cell({ r: i, c: j });
                ws[cell_ref].s = {
                    font: { bold: true },
                };
            }
        }

        XLSX.utils.book_append_sheet(wb, ws, 'Pret');

        // Download Excel file
        XLSX.writeFile(wb, 'Pret.xlsx');
    }
})


const validator = () => {
    if (totalSpace.value === '') totalSpace.value = 0;
    if(height.value === '') height.value = 0;
    if(bulbs.value === '') bulbs.value = 0;
    if(outlet.value === '') outlet.value = 0;
    if(water.value === '') water.value = 0;
    if(heatedFloor.value === '') heatedFloor.value = 0;
    if(usi.value === '') usi.value = 0;

    if (totalSpace.value >= 0 && height.value >= 0 && bulbs.value >= 0 && outlet.value >= 0 &&
         water.value >= 0 && heatedFloor.value >= 0 && usi.value >= 0 && phoneOk && emailOk
    ) {
        return true;
    } else {
        window.alert('Completati toate campurile corespunzator');
        return false;
    }
}

function sendEchipaMail(name, phone, emaill, message) {
    const params = {
        from_name: name,
        message: message,
        email_id: emaill,
        clientName: name,
        phone_number: phone
    }

    emailjs.send('service_8spjjfk', 'template_ym8naii', params).then(
        (response) => {

        },
        (error) => {
            window.alert('A aparut o eroare in timpul transmiterii mesajului dvs, va rugam incerca-ti mai tarziu...', error);
        },
    );
}
echidaBtn.addEventListener('click', () => {
    let phone22 = phone2.value;
    let name22 = name2.value;

    sendEchipaMail(name22, phone22, '', 'Doresc sa vin in echipa voastra');
});

contacteazaneBTN.addEventListener('click', () => {
    let email33 = email3.value;
    let name33 = name3.value;
    let tel33 = tel3.value

    sendEchipaMail(name33, tel33, email33, 'Mesaj din contact');
});