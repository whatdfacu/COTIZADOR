//Se verifica que el sitio esté listo
$(document).ready(function(){
    //Animacion de inicio
    $("#boxForm").slideDown(1000);
    //Datos de materiales de impresion
    const materiales = [
        {nombre: "PLA", precio:1700, id:1},
        {nombre: "ABS", precio:1500, id:2},
        {nombre: "TPU", precio:8000, id:3},
        {nombre: "NYLON", precio:2000, id:4},
    ]
    //Datos de Dolar
    const dolar = [{nombre:"precio", valor1:150, valor2:6.25,}]
    //Datos para incrementos de costos
    const incrementos = [
        {nombre: "ganancia", percentGanancia: 1.4, gastoElectricoHora:5, cantTrabajo:0.1, metrosPorKg:335,},
    ]
    //Se inicializa funcion para submit de formulario
    var miFormulario = $("#formulario");
    miFormulario.submit(function(e) {
            e.preventDefault();
            let nodoFormulario = e.target;

            //CAPTURA DE INPUT DE USUARIO "Metros de filamento a utilizar"
            let primerNodo = nodoFormulario.children[0];
            let metrosMaterialForm = primerNodo.children[1].value;
            //CAPTURA DE INPUT DE USUARIO "Horas de impresion"
            let segundoNodo = nodoFormulario.children[1];
            let horasDeImpresionForm = segundoNodo.children[1].value;
            //CAPTURA DE INPUT DE USUARIO "Elija material de impresion"      
            let materialUtilizadoForm = $("select option:selected").val();
            //CAPTURA DE INPUT DE USUARIO "Utilizar material de soporte"
            let materialDeSoporteForm = ($("#customSwitch1").prop('checked'));

            //Procesamiento de informacion
            let precioDolar = dolar.find(e => e.nombre=="precio").valor1;
            let hsDolar = dolar.find(e => e.nombre=="precio").valor2;
            let incrementosCantTrabajo = incrementos.find(e => e.nombre=="ganancia").cantTrabajo;

            let metrosPorKg = incrementos.find(e => e.nombre=="ganancia").metrosPorKg;
            let gastoElectricoHora = incrementos.find(e => e.nombre=="ganancia").gastoElectricoHora;
            let percentGanancia = incrementos.find(e => e.nombre=="ganancia").percentGanancia;

            //Reasignacion de varaiables a los input del usuario + warnings
            let metrosMaterial = metrosMaterialForm;
            let horasDeImpresion = horasDeImpresionForm;
            let materialElegido = materialUtilizadoForm;
            if(metrosMaterial <= 0 || ""){
                alert("Debe ingresar un número mayor a 0 en el campo de cantidad de metros de material");
            }else if (horasDeImpresion <= 0 || ""){
                alert("Debe ingresar un número mayor a 0 en el campo de cantidad de horas de impresión")
            }else if (materialElegido != "PLA" & materialElegido != "ABS" & materialElegido != "TPU" & materialElegido != "NYLON"){
                alert("Opción no disponible, por favor elija entre PLA, ABS, TPU o NYLON en el campo de material a utilizar")
            }else {
                    //Se selecciona define variable de costo de material elegido segun input de usuario                 
                    let precioMaterial = materiales.find(e => e.nombre ==materialElegido).precio;   
                    //Incremento de costo segun input de usuario
                    let sumaIncrement = incrementosCantTrabajo + 0.5;
                    if(materialDeSoporteForm == true){incrementosCantTrabajo = sumaIncrement};
                    //Cuentas preliminares
                    let trabajoHsPesos = (precioDolar * hsDolar)*incrementosCantTrabajo;
                    let costoCantMaterial = (precioMaterial / metrosPorKg) * metrosMaterial;
                    let gastoElectric = gastoElectricoHora*horasDeImpresion;
                    //Resultado final
                    let resultadoFinal = Math.floor((trabajoHsPesos + costoCantMaterial + gastoElectric) * percentGanancia);
                    //Muestra costo en HTML con animación
                    $("#nuevaInfo").append(`<div id="title"><h2><li>El costo de su impresion sera de ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(resultadoFinal)}.</li></h2>`
                    ,);
                    //Animación final y recarga de sitio para nueva cotización
                    $("#boton").click(function(){
                            $("#boxForm").slideUp(1000, function(){
                                location.reload()
                                });
                        });
                }
        });
    });