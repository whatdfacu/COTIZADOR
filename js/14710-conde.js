const materiales = [
    {nombre: "PLA", precio:1700, id:1},
    {nombre: "ABS", precio:1500, id:2},
    {nombre: "TPU", precio:8000, id:3},
    {nombre: "NYLON", precio:2000, id:4},
]
//DOLAR
const dolar = [
    {nombre:"precio", valor1:150, valor2:6.25,},
]
//INCREMENTOS
const incrementos = [
    {nombre: "ganancia", percentGanancia: 1.4, gastoElectricoHora:5, cantTrabajo:0.1, metrosPorKg:335,},
]

//CAPTURA DE DATOS DE FORMULARIO

$("#nuevaInfo").append("");

var miFormulario = $("#formulario");

miFormulario.submit(function(e) {
    e.preventDefault();
    let nodoFormulario = e.target;

    let primerNodo = nodoFormulario.children[0];
    let metrosMaterialForm = primerNodo.children[1].value;

    let segundoNodo = nodoFormulario.children[1];
    let horasDeImpresionForm = segundoNodo.children[1].value;
        
    let materialUtilizadoForm = $("select option:selected").val();

    let materialDeSoporteForm = ($("#customSwitch1").prop('checked'));

    //PROCESAMIENTO DE INFORMACION

let precioDolar = dolar.find(e => e.nombre=="precio").valor1;

let hsDolar = dolar.find(e => e.nombre=="precio").valor2;

let incrementosCantTrabajo = incrementos.find(e => e.nombre=="ganancia").cantTrabajo;



let metrosPorKg = incrementos.find(e => e.nombre=="ganancia").metrosPorKg;
let gastoElectricoHora = incrementos.find(e => e.nombre=="ganancia").gastoElectricoHora;

let percentGanancia = incrementos.find(e => e.nombre=="ganancia").percentGanancia;

//input del usuario más warnings

let metrosMaterial = metrosMaterialForm;
if(metrosMaterial <= 0 || ""){
    alert("Debe ingresar un número mayor a 0 en el campo de cantidad de metros de material");
    $("#metrosMaterial").css({"color": "red"});
};

let horasDeImpresion = horasDeImpresionForm;
if(horasDeImpresion <= 0 || ""){
    alert("Debe ingresar un número mayor a 0 en el campo de cantidad de horas de impresión")
    $("#horasDeImpresion").css({"color": "red"});
};

let materialElegido = materialUtilizadoForm;
if(materialElegido != "PLA" & materialElegido != "ABS" & materialElegido != "TPU" & materialElegido != "NYLON"){
    alert("Opción no disponible, por favor elija entre PLA, ABS, TPU o NYLON en el campo de material a utilizar")
    $("#materialUtilizado").css({"color": "red"});
};

let precioMaterial = materiales.find(e => e.nombre ==materialElegido).precio;

//INCREMENTADOR DE COSTO SEGUN INPUT
let siNo = materialDeSoporteForm;
if(materialDeSoporteForm = true){incrementosCantTrabajo++;};

//CUENTAS PRELIMINARES
let trabajoHsPesos = (precioDolar * hsDolar)*incrementosCantTrabajo;
let costoCantMaterial = (precioMaterial / metrosPorKg) * metrosMaterial;
let gastoElectric = gastoElectricoHora*horasDeImpresion;
//RESULTADO FINAL
let resultadoFinal = Math.floor((trabajoHsPesos + costoCantMaterial + gastoElectric) * percentGanancia);

//Muestra costo en HTML
$("#nuevaInfo").append(`<div><h2><li style="display: none" id="title">El costo de su impresion sera de ${resultadoFinal} pesos.</li></h2></div>`);
$("#title").slideDown(1000);
    
});