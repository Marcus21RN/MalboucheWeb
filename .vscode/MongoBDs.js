/* BASE DE DATOS LLAMADA MalboucheWeb. MANTENER TODA LA INFORMACIÓN TAL CUAL COMO APARECE AQUI PARA EVITAR DATOS ERRONEOS AL MOMENTO DE EJECUTARLO EN LA WEB*/

// COLECCIÓN: EMPLEADO
// Esta colección almacena información sobre los empleados del sistema, incluyendo su estado y rol asignado

// ESQUEMA
db.createCollection("empleado", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "primerApellido", "estado", "IDRol"],
      properties: {
        _id: {
          bsonType: "number",
          description: "Identificador único del empleado"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre de pila del empleado"
        },
        primerApellido: {
          bsonType: "string",
          description: "Primer apellido del empleado"
        },
        segundoApellido: {
          bsonType: ["string","null"],
          description: "Segundo apellido del empleado"
        },
        correo:{
            bsonType: "string",
            description: "Correo electrónico del empleado"
        },
        password:{
            bsonType: "string",
            description: "Contraseña del empleado"
        },
        estado: {
          bsonType: "string",
          description: "Estado (activo/inactivo)"
        },
        IDRol: {
          bsonType: "string",
          description: "ID del rol asignado al empleado (supervisor/empleado)"
        }
      }
    }
  }
})

// INSERTS
db.empleado.insertMany([
  {
    _id: 1001,
    nombre: "Carlos",
    primerApellido: "Gómez",
    segundoApellido: "Ramírez",
    correo: "carlos.gomez@example.com",
    password: "password123",
    estado: "activo",
    IDRol: "SUP3R"
  },
  {
    _id: 1002,
    nombre: "Lucia",
    primerApellido: "Mendoza",
    segundoApellido: null,
    correo: "lucia.mendoza@example.com",
    password: "password123",
    estado: "activo",
    IDRol: "3MPLE"
  },
  {
    _id: 1003,
    nombre: "Sofia",
    primerApellido: "López",
    segundoApellido: "Becerra",
    correo: "sofia.lopez@example.com",
    password: "password123",
    estado: "inactivo",
    IDRol: "3MPLE"
  },
  {
    _id: 1004,
    nombre: "Andrés",
    primerApellido: "Pérez",
    segundoApellido: "Morales",
    correo: "andres.perez@example.com",
    password: "password123",
    estado: "activo",
    IDRol: "3MPLE"
  }
])
