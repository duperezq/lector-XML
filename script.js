//se recibe el archivo que leera, en este caso es el xml
function leerArchivo(input) { //inicio de leer archivo 
  //en una lista de archivos seleccionados, elige el primer archivo
  let archivo = input.files[0]; //por eso indica [0] asi se selecciona el primer archivo en una cadena 
  let lector = new FileReader(); //pasamos el archivo a un objeto, para que sea reconocido por el programa
  lector.readAsText(archivo); //lector es el objeto creado en la linea anterior, aplicamos la funcion de readstext para pasarlo a cadena de caracteres
  lector.onload = function() { //onload significa una funcion que indique "si esta cargado"
      let contenido = lector.result; //result, porque es el resultado del archivo, es decir el texto
      let parser = new DOMParser();//es una funcion que permite leer archivos xml y su contenido
      let xmlDoc = parser.parseFromString(contenido, "text/xml"); // Analizar el contenido del archivo como un documento XML
      let errores = xmlDoc.getElementsByTagName("parsererror"); //si el documento contiene errores, aca se almacenan
//if
      try {
        // Código que puede arrojar una excepción
        if (errores.length > 0) { //si existe un error al leer el archivo, se queda encerrado aca y ya no se ejecuta el archivo
          throw new Error("Error en el archivo XML");//se queda encerrado en este try
        }
    //else 
  //aqui tambien podemos colocar un titulo general 

  //creamos el objeto tabla
  let tabla = "<table>"; // Crear una tabla HTML para mostrar los datos
  
  //tabla de simbolos
  //estas son las etiquetas padre, donde se derivan las demas etiquetas
  //let es la variable 
  let ciclo = xmlDoc.getElementsByTagName("ciclo");
  let mate= xmlDoc.getElementsByTagName("mate");
  let forif = xmlDoc.getElementsByTagName("if");
 
  
//iniciamos con la lectura de los ciclos
  for(let i=0;i<ciclo.length;i++){ 
    
    //añadimos el titulo a la tabla que se estan analizando ciclos 
    tabla += "<tr><td>" + "Analizando ciclos" + "</td></tr>"; //titulo de analisis de ciclos

    //estas definiciones solo son para buscar si se encuentran todas las etiquetas hijos correspondientes
    let Oclase = ciclo[i].getElementsByTagName("clase")[0];
    let Omensaje = ciclo[i].getElementsByTagName("mensaje")[0];
    let Oiterador = ciclo[i].getElementsByTagName("iterador")[0];
    //aqui no analizamos el child nodes porque solo queremos saber si estan las etiquetas
    //no lo que contiene la etiqueta
    //estas definiciones solo son para buscar si se encuentran todas las etiquetas hijos correspondientes
    
    //condicional para saber si estan todas las etiquetas hijos correspondientes 
    if (Oclase !== undefined && Oiterador !== undefined && Omensaje !== undefined) {
      //esto es lo que pasa si si estan todas las etiquetas hijos correspondientes
     
      //verifica si hay mas de una etiqueta correspondiente de hijos 

      if (ciclo[i].getElementsByTagName("clase").length>1 ||ciclo[i].getElementsByTagName("iterador").length > 1 || ciclo[i].getElementsByTagName("mensaje").length > 1) {
        tabla += "<tr><td>"+" Error: Se encontró más de una etiqueta hijo "+ "</td></tr>"; // Agregar una fila a la tabla con los datos de la persona
        continue; // Saltar a la siguiente iteración del ciclo
      }
   
      //verifica si hay mas de una etiqueta correspondiente de hijos

      //esto pasa si esta la cantida correcta de hijos    
      else {

      //aqui obtenemos el valor de la clase de iterador ya sea for/while/do-while
      //segun lo de eso veremos que ciclo usar en el switch
      let clase = ciclo[i].getElementsByTagName("clase")[0].childNodes[0].nodeValue;
      tabla += "<tr><td>" + "ITERADOR" + "</td><td>" + "MENSAJE" + "</td></tr>"; 
        

    switch (clase) {//segun la clase de ciclo se hace la iteracion 
      
      case "for": //caso de que sea un for
            //obtenemos el valor del mensaje a mostrar las veces que el iterador indica
            let mensaje = ciclo[i].getElementsByTagName("mensaje")[0].childNodes[0].nodeValue;
            //obtenemos el numero de veces que se repetira el mensaje de la etiqueta mensaje
            let iterador = ciclo[i].getElementsByTagName("iterador")[0].childNodes[0].nodeValue;

            //if para saber si iterador es un numero
            if (Number.isInteger(parseInt(iterador))) {//iniciamos a evaluar si iterador es un numero
              //esto sucede si es un numero
              for (let f =0 ; f <= iterador; f++){ 
                // Agregar una fila a la tabla con los datos del ciclo
                  tabla += "<tr><td>" + mensaje + "</td><td>" + f + "</td></tr>"; 
                } 
            } else { //esto sucede si iteradorwhile no es un numero
              tabla += "<tr><td>" + "Ciclo " +clase+" ERROR! La variable iterador no es un número entero" + "</td><td>" + iterador + "</td></tr>"; 
            }//termina de evaluar si iterador es un numero o no

             
      break; //termina el case de ciclo for

      case "while": //en caso de que sea while
            let w = 0;    
            let mensajewhile = ciclo[i].getElementsByTagName("mensaje")[0].childNodes[0].nodeValue;
            let iteradorwhile = ciclo[i].getElementsByTagName("iterador")[0].childNodes[0].nodeValue;
            
            //analisis para ver si los datos son enteros o no,
          if (Number.isInteger(parseInt(iteradorwhile))) {//iniciamos a evaluar si iterador es un numero
              //esto sucede si es un numero
              
              while (w <= iteradorwhile) {
                tabla += "<tr><td>" + mensajewhile + "</td><td>" + w + "</td></tr>"; 
              w++;
              }
             
          } else { //esto sucede si iteradorwhile no es un numero
            tabla += "<tr><td>" + "Ciclo " +clase+" ERROR! La variable iterador no es un número entero" + "</td><td>" + iteradorwhile + "</td></tr>"; 
          }//termina de evaluar si iterador es un numero o no

      break;//termina el analisis en while

      case "do-while":
            let d = 0;
            let mensajedwhile = ciclo[i].getElementsByTagName("mensaje")[0].childNodes[0].nodeValue;
            let iteradordwhile = ciclo[i].getElementsByTagName("iterador")[0].childNodes[0].nodeValue;

            if (Number.isInteger(parseInt(iteradordwhile))) {//iniciamos a evaluar si iterador es un numero
            //esto sucede si es un numero

              do {
                tabla += "<tr><td>" + mensajedwhile + "</td><td>" + d + "</td></tr>"; 
                d++;
              } while (d <= iteradordwhile);

            } else { //esto sucede si iteradorwhile no es un numero
              tabla += "<tr><td>" +"Ciclo " +clase+" ERROR! La variable iterador no es un número entero" + "</td><td>" + iteradordwhile + "</td></tr>"; 
            }//termina de evaluar si iterador es un numero o no

      break;
      
      default:
            
      tabla += "<tr><td>" + "Clase Incorrecta" + "</td><td>" + clase + "</td></tr>"; 
            

    }//termina el case de ciclos

    }

}else {
  tabla += "<tr><td>" + "Falta alguna etiqueta hijo" + "</td></tr>"; 
  
}
  }//termina lo de ciclos

  

//inicio de operaciones matematicas

for (let i = 0; i < mate.length; i++) { 
  tabla += "<tr><td>" + "Analizando Operaciones Matematicas" + "</td></tr>"; 

      //estas definiciones solo son para buscar si se encuentran todas las etiquetas hijos correspondientes
      let Otipo = mate[i].getElementsByTagName("tipo")[0];
      let Onum1 = mate[i].getElementsByTagName("num1")[0];
      let Onum2 = mate[i].getElementsByTagName("num2")[0];
      //aqui no analizamos el child nodes porque solo queremos saber si estan las etiquetas
      //no lo que contiene la etiqueta
      //estas definiciones solo son para buscar si se encuentran todas las etiquetas hijos correspondientes
      
      //condicional para saber si estan todas las etiquetas hijos correspondientes 
      if (Otipo !== undefined && Onum1 !== undefined && Onum2 !== undefined) {
        //esto es lo que pasa si si estan todas las etiquetas hijos correspondientes
       
        //verifica si hay mas de una etiqueta correspondiente de hijos 
  
        if (mate[i].getElementsByTagName("tipo").length>1||mate[i].getElementsByTagName("num1").length>1||mate[i].getElementsByTagName("num2").length>1){
          tabla += "<tr><td>"+" Error: Se encontró más de una etiqueta hijo "+ "</td></tr>"; // Agregar una fila a la tabla con los datos de la persona
          continue; // Saltar a la siguiente iteración del ciclo
        }
     
        //verifica si hay mas de una etiqueta correspondiente de hijos
  
        //esto pasa si esta la cantida correcta de hijos    
        else {

  let tipo = mate[i].getElementsByTagName("tipo")[0].childNodes[0].nodeValue;
  tabla += "<tr><td>"+"OPERACION: "  +"</td><td>"+ "RESULTADO" + "</td></tr>"; 
   
  
  switch (tipo) {
  
  //incia el caso de suma
  case "Suma":
  //convertimos los datos de etiquetas a enteros  
  let num1 = parseInt(mate[i].getElementsByTagName("num1")[0].childNodes[0].nodeValue);
  let num2 = parseInt(mate[i].getElementsByTagName("num2")[0].childNodes[0].nodeValue);
  //convertimos los datos de etiquetas a enteros
  //let n1 = num1; let n2 = num2;
  let n1=mate[i].getElementsByTagName("num1")[0].childNodes[0].nodeValue;
  let n2=mate[i].getElementsByTagName("num2")[0].childNodes[0].nodeValue;

      //analizando si son enteros
      if (Number.isInteger(num1) && Number.isInteger(parseInt(num2))) {
        //esto pasa si ambos son enteros correctos
        //mostrando en pantalla
        tabla += "<tr><td>" + tipo + " " + num1 +  " + "  + num2 +  " = "+"</td><td>"+ (num1 + num2) + "</td></tr>"; 
  
      } else if (Number.isInteger(num1) && isNaN(num2)) {

        //numero2 no es entero
        tabla += "<tr><td>" + tipo + "</td><td>" + "Error! Segundo Digito No es entero -"  + n2 + "- Primer Digito " + n1 +" </td></tr>"; 

      } else if (isNaN(num1) && Number.isInteger(parseInt(num2))) {
        //numero1 no es entero
        tabla += "<tr><td>" + tipo + "</td><td>" + "Error! Primer Digito No es entero -"  + n1 + "- Segundo Digito " +n2+" </td></tr>"; 

      } else {
        //ambos no son enteros
        tabla += "<tr><td>" + tipo + "</td><td>" + " Error! No son enteros! "+n1 +"<->"+n2 +"</td></tr>"; 
      }
      //analizando si son enteros 

  //termina el caso de suma 
  break;

  //inicia caso resta
  case "Resta":
  let numero1 = parseInt(mate[i].getElementsByTagName("num1")[0].childNodes[0].nodeValue);
  let numero2 = parseInt(mate[i].getElementsByTagName("num2")[0].childNodes[0].nodeValue);
  let nI  = mate[i].getElementsByTagName("num1")[0].childNodes[0].nodeValue;
  let nII = mate[i].getElementsByTagName("num2")[0].childNodes[0].nodeValue;


            //analizando si son enteros
        if (Number.isInteger(numero1) && Number.isInteger(parseInt(numero2))) {
            //esto pasa si ambos son enteros correctos
            //mostrando en pantalla
            tabla += "<tr><td>" + tipo + " " + num1 +  " - "  + num2 +  " = "+"</td><td>"+ (num1 - num2) + "</td></tr>"; 
  
        } else if (Number.isInteger(numero1) && isNaN(numero2)) {
      
            //numero2 no es entero
            tabla += "<tr><td>" + tipo + "</td><td>" + "Error! Segundo Digito No es entero -"  + nII + "- Primer Digito " +nI+" </td></tr>"; 
      
        } else if (isNaN(numero1) && Number.isInteger(parseInt(numero2))) {
            //numero1 no es entero
            tabla += "<tr><td>" + tipo + "</td><td>" + "Error! Primer Digito No es entero -"  + nI + "- Segundo Digito " +nII+" </td></tr>"; 
        } else {
            //ambos no son enteros
            tabla += "<tr><td>" + tipo + "</td><td>" + " Error! No son enteros! "+nI+"<->"+nII+"</td></tr>"; 
        }
        //analizando si son enteros 
  //termina caso de resta      
  break;

  //inicia caso de multiplicacion
  case "Multiplicacion":
  let nr1 = parseInt(mate[i].getElementsByTagName("num1")[0].childNodes[0].nodeValue);
  let nr2 = parseInt(mate[i].getElementsByTagName("num2")[0].childNodes[0].nodeValue);
  let nrI  = mate[i].getElementsByTagName("num1")[0].childNodes[0].nodeValue;
  let nrII = mate[i].getElementsByTagName("num2")[0].childNodes[0].nodeValue;


            //analizando si son enteros
        if (Number.isInteger(nr1) && Number.isInteger(parseInt(nr2))) {
            //esto pasa si ambos son enteros correctos
            //mostrando en pantalla
            tabla += "<tr><td>"+ tipo + " " + num1 +  " * "  + num2 +  " = "+"</td><td>"+ (num1 * num2) + "</td></tr>"; 
  
        } else if (Number.isInteger(nr1) && isNaN(nr2)) {
      
            //numero2 no es entero
            tabla += "<tr><td>" + tipo + "</td><td>" + "Error! Segundo Digito No es entero -"  + nrII + "- Primer Digito " +nrI+" </td></tr>"; 
      
        } else if (isNaN(nr1) && Number.isInteger(parseInt(nr2))) {
            //numero1 no es entero
            tabla += "<tr><td>" + tipo + "</td><td>" + "Error! Primer Digito No es entero -"  + nrI + "- Segundo Digito " +nrII+" </td></tr>"; 
        } else {
            //ambos no son enteros
            tabla += "<tr><td>" + tipo + "</td><td>" + " Error! No son enteros! "+nrI+"<->"+nrII+"</td></tr>"; 
        }
        //analizando si son enteros 
  //termina caso de multiplicacion      
  break;


  default:
  tabla += "<tr><td>" + "Operacion Incorrecta" + "</td><td>" + tipo + "</td></tr>"; 

}
}
}else {
  tabla += "<tr><td>" + "Falta alguna etiqueta hijo" + "</td></tr>"; 
}

}
//fin de operaciones matematicas


  //condicional if
for (let i = 0; i < forif.length; i++) { 
    tabla += "<tr><td>" + "Analizando Condicion If" + "</td></tr>"; 

    let Ocondicion = forif[i].getElementsByTagName("condicion")[0];
    let Onumero1   = forif[i].getElementsByTagName("numero1")[0];
    let Onumero2   = forif[i].getElementsByTagName("numero2")[0];
    
    //validando si estan todos sus hijos

 if (Ocondicion !== undefined && Onumero1 !== undefined && Onumero2 !== undefined) {

    if (forif[i].getElementsByTagName("condicion").length>1 ||forif[i].getElementsByTagName("numero1").length > 1 || forif[i].getElementsByTagName("numero2").length > 1) {
      tabla += "<tr><td>"+" Error: Se encontró más de una etiqueta hijo "+ "</td></tr>"; 
      continue; // Saltar a la siguiente iteración del ciclo
    }
    else {

   //validando si las etiquetas son correctas
   let condicion = forif[i].getElementsByTagName("condicion")[0].childNodes[0].nodeValue;
   let numero1 = parseInt(forif[i].getElementsByTagName("numero1")[0].childNodes[0].nodeValue);
   let numero2 = parseInt(forif[i].getElementsByTagName("numero2")[0].childNodes[0].nodeValue);
   let number1 = forif[i].getElementsByTagName("numero1")[0].childNodes[0].nodeValue;
   let number2 = forif[i].getElementsByTagName("numero2")[0].childNodes[0].nodeValue;
     
   tabla += "<tr><td>"+"CONDICION: "  +"</td><td>"+ "RESULTADO" + "</td></tr>"; 
  //sirve para ver si los numeros son numeros si son enteros
   if (Number.isInteger(numero1) && Number.isInteger(parseInt(numero2))) {
   
    switch (condicion) {
      //caso mayor
     case "Mayor":
        if (numero1 > numero2) {
          tabla += "<tr><td>" + condicion + " "+ numero1 + " y " + numero2 + "</td>"+"<td>"+ "El mayor es: " + numero1 + "</td></tr>"; 
        } else if(numero2 > numero1) {
          tabla += "<tr><td>" + condicion + " "+ numero1 + " y " + numero2 + "</td>"+"<td>"+ "El mayor es: " + numero2 + "</td></tr>"; 
        } else if(numero1==numero2){
          tabla += "<tr><td>" + condicion + " "+ numero1 + " y " + numero2 + "</td>"+"<td>"+ "Ambos numeros son iguales" + "</td></tr>"; 
        }
      //Caso mayor
      break;
      //caso menor
      case "Menor":
      //caso menor
        if (numero1<numero2) {
          tabla += "<tr><td>" + condicion + " "+ numero1 + " y " + numero2 + "</td>"+"<td>"+ "El menor es: " + numero1 + "</td></tr>"; 
        } 
        else if(numero1==numero2){
          tabla += "<tr><td>" + condicion + " "+ numero1 + " y " + numero2 + "</td>"+"<td>"+ "Ambos numeros son iguales" + "</td></tr>"; 
        }
        else if (numero2<numero1){
          tabla += "<tr><td>" + condicion + " "+ numero1 + " y " + numero2 + "</td>"+"<td>"+ "El menor es: " + numero2 + "</td></tr>";         }  
        //caso menor
      break;
      
      default:
        tabla += "<tr><td>" + "Condicion Incorrecta " + "</td><td>" + condicion + "</td></tr>"; // Agregar una fila a la tabla con los datos de la persona
    }  

    //la parte donde examina cual digito no es el entero
  } else if (Number.isInteger(parseInt(numero1)) && isNaN(numero2)) {

    //numero2 no es entero
    tabla += "<tr><td>" + condicion + "</td><td>" + "Error! Segundo Digito No es entero -"  + number2 + "- Primer Digito " +number1+" </td></tr>"; 

  } else if (isNaN(numero1) && Number.isInteger(parseInt(numero2))) {
    //numero1 no es entero
    tabla += "<tr><td>" + condicion + "</td><td>" + "Error! Primer Digito No es entero -"  + number1 + "- Segundo Digito " +number2+" </td></tr>"; 
  } else if(isNaN(numero1) && isNaN(numero2)) {
    //ambos no son enteros
    tabla += "<tr><td>" + condicion + "</td><td>" + " Error! No son enteros! "+number1+"<->"+number2+"</td></tr>"; 
  }
//aqui termina el analisis de ver cual digito no es entero

  } //evaluando si estan todas las etiquetas

}else{
  //esto muestra cuando le hace falta un hijo
      tabla += "<tr><td>" + "Falta alguna etiqueta hijo" + "</td></tr>"; // Agregar una fila a la tabla con los datos de la persona
    }
  }
  //termina condicional if

  tabla += "</table>";
  document.getElementById("tabla").innerHTML = tabla;

            } catch (error) {

            // Mostrar mensaje de error en el documento HTML
            let errorElement = document.createElement("p");
            errorElement.textContent = error.message;
            document.body.appendChild(errorElement);
            }
      };

}
 //final de leer archivo

