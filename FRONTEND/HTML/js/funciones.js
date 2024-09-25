var url = "http://localhost:8081/api/productos";

function calcular() {
    //alert("Este es una alerta!!!");
    //console.log("entro a la funcion de calcular");

    var numero1 = 0;
    var numero2 = 0;
    var opcion = "";
    var resultado = 0;

    //numero1 = document.getElementById("numero1").value;
    
    numero1 = parseInt($("#numero1").val());
    numero2 = parseInt($("#numero2").val());
    opcion = $("#operacion").val();

    console.log("Numero 1 es:" + numero1);
    console.log("Numero 2 es:" + numero2);
    console.log("Opcion es:" + opcion);

    // condicionales y operar
    if(opcion == "S") {
        resultado = numero1 + numero2;
    }
    if(opcion == "R") {
        resultado = numero1 - numero2;
    }
    if(opcion == "M") {
        resultado = numero1 * numero2;
    }
    if(opcion == "D") {
        if (numero2 == 0){
            alert("No se puede dividir entre 0");
            resultado = "Error!!";
            
        } else {
            resultado = numero1 / numero2;
            resultado = resultado.toFixed(8);
        }
    }
    console.log("El resultado es:" + resultado);

    // imprimir resultado en el html
    $("#resultado").html(resultado);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
 
function convertirFormDataAJSON(formData) {
    var loginForm = formData.serializeArray();
    var loginFormObject = {};
    $.each(loginForm,
        function(i, v) {
        loginFormObject[v.name] = v.value;
    });
    return JSON.stringify(loginFormObject);
}

function listar_productos(){
    
    console.log("Ejecutar Listar Productos");
    var data = [];
    var success = function (response) {
        var items = [];
        $.each(response,function(index, producto){
            items.push("<tr><td>"+producto.id+"</td><td>"+producto.nombre+"</td><td>"+producto.proveedor+"</td><td>"+producto.precio+"</td> <td>"+producto.stock+"</td> <td>"+producto.categorias_Id+"</td><td><a class='btn btn-success' href='editar.html?id="+producto.id+"'>Editar</a> <a class='btn btn-danger' href='eliminar.html?id="+producto.id+"'>Eliminar</a></td></tr>");
        });
        $("#listar_productos").html("<table class='table table-dark table-hover'><thead><tr><th>ID</th><th>NOMBRE</th><th>PROVEEDOR</th><th>PRECIO</th><th>INVENTARIO</th><th>CATEGORIA</th><th colspan='2'>OPCIONES</th></tr></thead><tbody>"+items.join("")+"</tbody></table>");
    };

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
    
}

function editar_producto(id) {
    console.log("llamado editar producto");
    var url2 = url + "/" + id;
    var data = [];
    var success = function (response) {
        console.log(response); 
        $("#formEditar #id").val(response.id);
        $("#formEditar #nombre").val(response.nombre);
        $("#formEditar #proveedor").val(response.proveedor);
        $("#formEditar #precio").val(response.precio);
        $("#formEditar #stock").val(response.stock);
        $("#formEditar #categorias_Id").val(response.categorias_Id);
        //$("#modalEditar").modal();
    };
    
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}

function actualizar_producto(){
    console.log("llamado a actualizar producto");
    var data = convertirFormDataAJSON($("#formEditar"));
    var success = function (response) {
        alert("El producto fue actualizado");
        window.location.href = "lista.html";
    }
console.log(data);
    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}

function nuevo_usuario(){
    console.log("llamado a nuevo usuario");
    var data = convertirFormDataAJSON($("#formRegistrar"));
    var success = function (response) {
        alert("El usuario fue registrado");
        listar_usuarios();
        $("#boton-cerrar").click();
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}


function eliminar_usuario(id){
    console.log("llamado a eliminar usuario");
    var data = [];
    var url2 = url + "/" + id;
    var success = function (response) {
        alert("El usuario fue eliminado");
        listar_usuarios();
    }

    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url2,
        context: data,
        data: data,
        dataType: "json",
        success: success
    });
}