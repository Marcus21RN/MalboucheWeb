/* BASE DE DATOS LLAMADA MalboucheWeb. MANTENER TODA LA INFORMACIÓN TAL CUAL COMO APARECE AQUI PARA EVITAR DATOS ERRONEOS AL MOMENTO DE EJECUTARLO EN LA WEB*/

// COLECCIÓN: EMPLEADO
// Esta colección almacena información sobre los empleados del sistema, incluyendo su estado y rol asignado

// ESQUEMA
db.createCollection("empleado", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "primerApellido","correo", "password", "estado", "IDRol"],
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
          enum: ["activo", "inactivo"],
          description: "Estado (activo/inactivo)"
        },
        IDRol: {
          bsonType: "string",
          enum: ["ADMIN", "EMPLE"],
          description: "ID del rol asignado al empleado (Administrador/Empleado)"
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
    IDRol: "ADMIN"
  },
  {
    _id: 1002,
    nombre: "Lucia",
    primerApellido: "Mendoza",
    segundoApellido: null,
    correo: "lucia.mendoza@example.com",
    password: "password123",
    estado: "activo",
    IDRol: "EMPLE"
  },
  {
    _id: 1003,
    nombre: "Sofia",
    primerApellido: "López",
    segundoApellido: "Becerra",
    correo: "sofia.lopez@example.com",
    password: "password123",
    estado: "inactivo",
    IDRol: "EMPLE"
  },
  {
    _id: 1004,
    nombre: "Andrés",
    primerApellido: "Pérez",
    segundoApellido: "Morales",
    correo: "andres.perez@example.com",
    password: "password123",
    estado: "activo",
    IDRol: "EMPLE"
  }
])


// COLECCIÓN: ROL
// Esta colección almacena información sobre los roles de los empleados en el sistema

// ESQUEMA DE ROL
db.createCollection("rol", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Clave unica del rol"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del rol"
        }
      }
    }
  }
})

// INSERTS DE ROL
db.rol.insertMany([
  { _id: "ADMIN", nombre: "Administrador"},
  { _id: "EMPLE", nombre: "Empleado"},
])

// COLECCIÓN: EVENTO
// Esta colección almacena información sobre los eventos del sistema, incluyendo su estado y descripción

// ESQUEMA DE EVENTO
db.createCollection("evento", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "descripcion", "fecha", "horaInicio", "horaFinal", "estado"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Código del evento"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del evento"
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción del evento"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha en que se llevará a cabo el evento"
        },
        horaInicio: {
          bsonType: "string",
          description: "Hora de inicio del evento"
        },
        horaFinal: {
          bsonType: "string",
          description: "Hora de finalización del evento"
        },
        estado: {
          bsonType: "string",
          enum: ["pendiente", "cancelada", "finalizada"],
          description: "Estado del evento"
        },
        imagen: {
          bsonType: ["string", "null"],
          description: "URL de la imagen del evento"
        }
      }
    }
  }
})

// INSERS A DE EVENTO
db.evento.insertMany([
  {
    _id: "CJ001",
    nombre: "Concierto de Jazz",
    descripcion: "Noche de jazz en vivo con la banda Blue Notes",
    fecha: ISODate("2025-06-28T00:00:00Z"),
    horaInicio: "20:00",
    horaFinal: "23:00",
    estado: "pendiente",
    imagen: "https://example.com/concierto-jazz.jpg"
  },
  {
    _id: "NS001",
    nombre: "Noche de Salsa",
    descripcion: "Clases y baile libre con orquesta en vivo",
    fecha: ISODate("2025-07-05T00:00:00Z"),
    horaInicio: "21:00",
    horaFinal: "00:00",
    estado: "pendiente",
    imagen: "https://example.com/noche-salsa.jpg"
  },
  {
    _id: "CQ002",
    nombre: "Tributo a Queen",
    descripcion: "Concierto tributo con banda invitada",
    fecha: ISODate("2025-07-12T00:00:00Z"),
    horaInicio: "20:30",
    horaFinal: "23:30",
    estado: "pendiente",
    imagen: "https://example.com/tributo-queen.jpg"
  },
  {
    _id: "NK002",
    nombre: "Noche de Karaoke",
    descripcion: "Participa y gana bebidas gratis",
    fecha: ISODate("2025-07-19T00:00:00Z"),
    horaInicio: "19:00",
    horaFinal: "22:00",
    estado: "pendiente",
    imagen: "https://example.com/noche-karaoke.jpg"
  }
])


// COLECIÓN: RESERVACIÓN
// Esta colección almacena información sobre las reservaciones realizadas por los clientes, incluyendo el estado.

// ESQUEMA DE RESERVACIÓN
db.createCollection("reservacion", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "nombreCliente",
        "primerApellido",
        "correoCliente",
        "telefono",
        "fecha",
        "horaInicio",
        "cantidadPersonas",
        "fechaReservacion",
        "estado"
      ],
      properties: {
        _id: {
          bsonType: "string",
          description: "Folio de la reservación"
        },
        nombreCliente: {
          bsonType: "string",
          description: "Nombre del cliente que reservó"
        },
        primerApellido: {
          bsonType: "string",
          description: "Primer apellido del cliente"
        },
        segundoApellido: {
          bsonType: ["string","null"],
          description: "Segundo apellido del cliente"
        },
        correoCliente: {
          bsonType: "string",
          description: "Correo del cliente quien hizo la reservación"
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono de contacto del cliente"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha cuando se llevará a cabo la reservación"
        },
	      horaInicio: {
          bsonType: "string",
          description: "Hora de la reservación"
        },
	      cantidadPersonas: {
          bsonType: "number",
          description: "Número de personas que asistirán"
        },
        fechaReservacion: {
          bsonType: "date",
          description: "Fecha en que se realizó la reservación"
        },
        estado: {
          bsonType: "string",
          enum: ["pendiente", "cancelada", "finalizada"],
          description: "Estado de la reservación"
        }
      }
    }
  }
})


// INSERTS DE RESERVACIÓN
db.reservacion.insertMany([
  {
    _id: "RSV-0015",
    nombreCliente: "Ricardo",
    primerApellido: "Castro",
    segundoApellido: null,
    correoCliente: "ricardo.castro@hotmail.com",
    telefono: "555-1234",
    fecha: ISODate("2025-06-15T00:00:00Z"),
    horaInicio: "19:00",
    cantidadPersonas: 2,
    fechaReservacion: ISODate("2025-06-01T00:00:00Z"),
    estado: "cancelada"
  },
  {
    _id: "RSV-0014",
    nombreCliente: "Paula",
    primerApellido: "Moreno",
    segundoApellido: null,
    correoCliente: "paula.moreno@yahoo.com",
    telefono: "555-5678",
    fecha: ISODate("2025-06-20T00:00:00Z"),
    horaInicio: "18:00",
    cantidadPersonas: 3,
    fechaReservacion: ISODate("2025-06-01T00:00:00Z"),
    estado: "cancelada"
  },
  {
    _id: "RSV-0013",
    nombreCliente: "Jorge",
    primerApellido: "Silva",
    segundoApellido: null,
    correoCliente: "jorge.silva@hotmail.com",
    telefono: "555-8765",
    fecha: ISODate("2025-06-28T00:00:00Z"),
    horaInicio: "19:30",
    cantidadPersonas: 5,
    fechaReservacion: ISODate("2025-06-01T00:00:00Z"),
    estado: "finalizada"
  },
  {
    _id: "RSV-0012",
    nombreCliente: "Valeria",
    primerApellido: "Santos",
    segundoApellido: null,
    correoCliente: "valeria.santos@gmail.com",
    telefono: "555-4321",
    fecha: ISODate("2025-06-30T00:00:00Z"),
    horaInicio: "20:00",
    cantidadPersonas: 4,
    fechaReservacion: ISODate("2025-06-01T00:00:00Z"),
    estado: "finalizada"
  },
  {
    _id: "RSV-0010",
    nombreCliente: "Natalia",
    primerApellido: "Vera",
    segundoApellido: null,
    correoCliente: "natalia.vera@gmail.com",
    telefono: "555-9876",
    fecha: ISODate("2025-07-20T00:00:00Z"),
    horaInicio: "20:00",
    cantidadPersonas: 2,
    fechaReservacion: ISODate("2025-07-01T00:00:00Z"),
    estado: "pendiente"
  },
  {
    _id: "RSV-0011",
    nombreCliente: "Oscar",
    primerApellido: "Navarro",
    segundoApellido: "López",
    correoCliente: "oscar.navarro@outlook.com",
    telefono: "555-6543",
    fecha: ISODate("2025-07-25T00:00:00Z"),
    horaInicio: "21:00",
    cantidadPersonas: 6,
    fechaReservacion: ISODate("2025-07-01T00:00:00Z"),
    estado: "pendiente"
  }
])

// COLECCIÓN: PRODUCTO
// Esta colección almacena información sobre los productos disponibles en el sistema, incluyendo su precio y descripción.

// ESQUEMA DE PRODUCTO
db.createCollection("producto", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "precio", "descripcion"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Código del producto"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del producto"
        },
        precio: {
          bsonType: ["double","int"],
          description: "Precio del producto"
        },
	      descripcion: {
          bsonType: "string",
          description: "Descripción del producto"
        },
        categoria: {
          bsonType: "string",
          description: "Categoría del producto (cócteles, licores, bebidas, botanas, etc.)",
        },
      }
    }
  }
})

// INSERTS DE PRODUCTO
db.producto.insertMany([
  { _id: "maito", nombre: "Mai Tai Mojito", precio: 95.00, descripcion: "Cóctel tropical con ron, menta y cítricos.", categoria: "Cócteles" },
  { _id: "negto", nombre: "Negroni Tradito", precio: 90.00, descripcion: "Cóctel italiano con gin, vermut y Campari.", categoria: "Cócteles" },
  { _id: "teqha", nombre: "Tequila Poncha", precio: 110.00, descripcion: "Mezcla potente con tequila, frutas y especias.", categoria: "Cócteles" },
  { _id: "daisa", nombre: "Daiquiri Rosa", precio: 85.00, descripcion: "Cóctel con ron blanco y toque de fresa.", categoria: "Cócteles" },
  { _id: "mojde", nombre: "Mojito Verde", precio: 90.00, descripcion: "Mojito con extra de menta fresca y limón.", categoria: "Cócteles" },
  { _id: "whiva", nombre: "Whiskey Reserva", precio: 145.00, descripcion: "Whiskey añejado con notas de madera y vainilla.", categoria: "Licores" },
  { _id: "rumco", nombre: "Ron Clásico", precio: 85.00, descripcion: "Ron oscuro tradicional, ideal para mezclas.", categoria: "Licores" },
  { _id: "tongo", nombre: "Tonic Amargo", precio: 42.75, descripcion: "Agua tónica con sabor amargo y burbujeante.", categoria: "Bebidas" },
  { _id: "blory", nombre: "Bloody Mary", precio: 100.00, descripcion: "Cóctel clásico con vodka, jugo de tomate y especias.", categoria: "Cócteles" },
  { _id: "ginum", nombre: "Ginebra Premium", precio: 120.00, descripcion: "Ginebra con botánicos selectos, ideal para coctelería.", categoria: "Licores" },
  { _id: "caial", nombre: "Caipirinha Natural", precio: 85.00, descripcion: "Cóctel brasileño con cachaça, lima y azúcar.", categoria: "Cócteles" },
  { _id: "ceria", nombre: "Cerveza Rubia", precio: 48.50, descripcion: "Cerveza clara ligera con final refrescante.", categoria: "Bebidas" },
  { _id: "cerra", nombre: "Cerveza Ligera", precio: 45.25, descripcion: "Cerveza baja en alcohol, sabor suave y fresco.", categoria: "Bebidas" },
  { _id: "micca", nombre: "Michelada Clásica", precio: 60.45, descripcion: "Cerveza con limón, sal y salsas picantes.", categoria: "Bebidas" },
  { _id: "cerne", nombre: "Cerveza Negra", precio: 55.10, descripcion: "Cerveza oscura con notas tostadas y cuerpo robusto.", categoria: "Bebidas" },
  { _id: "certo", nombre: "Cerveza Trigo", precio: 50.30, descripcion: "Cerveza de trigo con sabor frutal y ligero.", categoria: "Bebidas" },
  { _id: "cerpa", nombre: "Cerveza IPA", precio: 65.55, descripcion: "India Pale Ale, amarga y aromática.", categoria: "Bebidas" },
  { _id: "nacso", nombre: "Nachos con Queso", precio: 75.00, descripcion: "Totopos con queso fundido, jalapeños y salsa.", categoria: "Botanas" },
  { _id: "alibq", nombre: "Alitas BBQ", precio: 95.00, descripcion: "Alitas de pollo bañadas en salsa barbacoa.", categoria: "Botanas" },
  { _id: "papas", nombre: "Papas Fritas", precio: 50.00, descripcion: "Papas cortadas en bastones, fritas y crujientes.", categoria: "Botanas" },
  { _id: "quedo", nombre: "Queso Asado", precio: 85.00, descripcion: "Queso fundido con chiles y especias.", categoria: "Botanas" },
  { _id: "guale", nombre: "Guacamole", precio: 65.00, descripcion: "Aguacate machacado con jitomate, cebolla y limón.", categoria: "Botanas" },
  { _id: "taczo", nombre: "Tacos de Chorizo", precio: 80.00, descripcion: "Tacos pequeños con chorizo, cebolla y cilantro.", categoria: "Botanas" },
  { _id: "papes", nombre: "Papas con Wedges", precio: 60.60, descripcion: "Papas cortadas en gajos, sazonadas y fritas.", categoria: "Botanas" },
  { _id: "cafno", nombre: "Café Americano", precio: 35.25, descripcion: "Café negro suave, ideal para acompañar postres.", categoria: "Bebidas" },
  { _id: "capno", nombre: "Capuchino", precio: 45.75, descripcion: "Café espresso con leche espumosa.", categoria: "Bebidas" },
  { _id: "teado", nombre: "Té Helado", precio: 30.00, descripcion: "Té frío con limón y un toque de azúcar.", categoria: "Bebidas" },
  { _id: "limal", nombre: "Limonada Natural", precio: 25.00, descripcion: "Agua fresca con limón, hielo y azúcar.", categoria: "Bebidas" },
  { _id: "gindo", nombre: "Gintonic Rosado", precio: 110.00, descripcion: "Ginebra con tónica rosa y frutos rojos.", categoria: "Cócteles" },
  { _id: "ronna", nombre: "Ron Piña", precio: 95.00, descripcion: "Cóctel dulce con ron y jugo de piña.", categoria: "Cócteles" },
  { _id: "teqta", nombre: "Tequila Margarita", precio: 105.00, descripcion: "Tequila con triple sec y jugo de limón.", categoria: "Cócteles" },
  { _id: "cerut", nombre: "Cerveza Stout", precio: 70.00, descripcion: "Cerveza oscura, cremosa y con sabor intenso.", categoria: "Bebidas" },
  { _id: "cerss", nombre: "Cerveza Weiss", precio: 60.00, descripcion: "Cerveza de trigo con notas a banana y clavo.", categoria: "Bebidas" },
  { _id: "palso", nombre: "Palitos de Queso", precio: 80.00, descripcion: "Palitos crujientes de queso empanizados.", categoria: "Botanas" },
  { _id: "paple", nombre: "Papas con Chile", precio: 65.00, descripcion: "Papas fritas con chile y especias picantes.", categoria: "Botanas" },
  { _id: "taclo", nombre: "Tacos de Pollo", precio: 75.00, descripcion: "Tacos pequeños de pollo con salsa especial.", categoria: "Botanas" },
  { _id: "cafhe", nombre: "Café con Leche", precio: 40.00, descripcion: "Café suave mezclado con leche caliente.", categoria: "Bebidas" },
  { _id: "jugal", nombre: "Jugo Natural", precio: 30.00, descripcion: "Jugo fresco de naranja natural sin azúcar.", categoria: "Bebidas" }
])


// COLECCIÓN: MENÚ
// Esta colección almacena información sobre los menús disponibles en el sistema, incluyendo los productos y sus precios.

// ESQUEMA DE MENÚ
db.createCollection("menus", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "productos"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Código único del menú"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del menú"
        },
        tipoMenu:{
          bsonType: "string",
          description: "Tipo de menú (bebidas, cócteles, botanas, etc.)",
        },  
        estado: {
          bsonType: "string",
          description: "Estado del menú (activo, inactivo)",
          enum: ["activo", "inactivo"]
        },
        productos: {
          bsonType: "array",
          description: "Lista de productos incluidos en el menú",
          items: {
            bsonType: "object",
            required: ["IDProducto"],
            properties: {
              IDProducto: {
                bsonType: "string",
                description: "Código del producto"
              }
            }
          }
        }
      }
    }
  }
})

// INSERTS DE MENÚ

db.menus.insertMany([
  {
    _id: "MENU001",
    nombre: "Menú de Cervezas",
    descripcion: "Variedad de cervezas nacionales e importadas.",
    tipoMenu: "bebidas",
    estado: "activo",
    productos: [
      { IDProducto: "ceria" },
      { IDProducto: "cerra" },
      { IDProducto: "micca" },
      { IDProducto: "cerne" },
      { IDProducto: "certo" },
      { IDProducto: "cerpa" },
      { IDProducto: "cerut" },
      { IDProducto: "cerss" }
    ]
  },
  {
    _id: "MENU002",
    nombre: "Menú de Tragos Clásicos",
    descripcion: "Cócteles tradicionales y clásicos.",
    tipoMenu: "cócteles",
    estado: "activo",
    productos: [
      { IDProducto: "maito" },
      { IDProducto: "negto" },
      { IDProducto: "daisa" },
      { IDProducto: "blory" },
      { IDProducto: "caial" },
      { IDProducto: "gindo" },
      { IDProducto: "ronna" },
      { IDProducto: "teqta" }
    ]
  },
  {
    _id: "MENU003",
    nombre: "Menú de Whisky y Ron",
    descripcion: "Selección de whiskys y rones premium.",
    tipoMenu: "licores",
    estado: "activo",
    productos: [
      { IDProducto: "whiva" },
      { IDProducto: "rumco" }
    ]
  },
  {
    _id: "MENU004",
    nombre: "Menú Refrescantes",
    descripcion: "Bebidas no alcohólicas para refrescarte.",
    tipoMenu: "bebidas",
    estado: "activo",
    productos: [
      { IDProducto: "tongo" },
      { IDProducto: "teado" },
      { IDProducto: "limal" },
      { IDProducto: "jugal" }
    ]
  },
  {
    _id: "MENU005",
    nombre: "Menú de Cafés",
    descripcion: "Variedad de cafés calientes y fríos.",
    tipoMenu: "cafés",
    estado: "activo",
    productos: [
      { IDProducto: "cafno" },
      { IDProducto: "capno" },
      { IDProducto: "cafhe" }
    ]
  },
  {
    _id: "MENU006",
    nombre: "Menú Café y Refrescos",
    descripcion: "Cafés y bebidas refrescantes.",
    tipoMenu: "cafés",
    estado: "activo",
    productos: [
      { IDProducto: "cafno" },
      { IDProducto: "capno" },
      { IDProducto: "teado" },
      { IDProducto: "limal" }
    ]
  },
  {
    _id: "MENU007",
    nombre: "Menú Ginebra y Cócteles",
    descripcion: "Cócteles a base de ginebra.",
    tipoMenu: "cócteles",
    estado: "activo",
    productos: [
      { IDProducto: "ginum" },
      { IDProducto: "maito" },
      { IDProducto: "negto" },
      { IDProducto: "blory" }
    ]
  },
  {
    _id: "MENU008",
    nombre: "Menú de Bebidas",
    descripcion: "Selección de cócteles, cervezas y cafés.",
    tipoMenu: "bebidas",
    estado: "activo",
    productos: [
      { IDProducto: "maito" },
      { IDProducto: "negto" },
      { IDProducto: "teqha" },
      { IDProducto: "daisa" },
      { IDProducto: "mojde" },
      { IDProducto: "whiva" },
      { IDProducto: "rumco" },
      { IDProducto: "tongo" },
      { IDProducto: "blory" },
      { IDProducto: "ginum" },
      { IDProducto: "caial" },
      { IDProducto: "ceria" },
      { IDProducto: "cerra" },
      { IDProducto: "micca" },
      { IDProducto: "cerne" },
      { IDProducto: "certo" },
      { IDProducto: "cerpa" },
      { IDProducto: "gindo" },
      { IDProducto: "ronna" },
      { IDProducto: "teqta" },
      { IDProducto: "cerut" },
      { IDProducto: "cerss" },
      { IDProducto: "cafno" },
      { IDProducto: "capno" },
      { IDProducto: "teado" },
      { IDProducto: "limal" },
      { IDProducto: "cafhe" },
      { IDProducto: "jugal" }
    ]
  },
  {
    _id: "MENU009",
    nombre: "Menú de Botanas",
    descripcion: "Aperitivos y botanas para compartir.",
    tipoMenu: "botanas",
    estado: "activo",
    productos: [
      { IDProducto: "nacso" },
      { IDProducto: "alibq" },
      { IDProducto: "papas" },
      { IDProducto: "quedo" },
      { IDProducto: "guale" },
      { IDProducto: "taczo" },
      { IDProducto: "papes" },
      { IDProducto: "palso" },
      { IDProducto: "paple" },
      { IDProducto: "taclo" }
    ]
  }
])

// COLECCIÓN: PROMOCION
// Esta colección almacena información sobre las promociones disponibles en el sistema, incluyendo su estado y descripción.

// ESQUEMA DE PROMOCION
db.createCollection("promocion", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre", "descripcion", "fechaInicio", "fechaFin"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Código de la promoción"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre de la promoción"
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción de la promoción"
        },
	      fechaInicio: {
          bsonType: "date",
          description: "Fecha cuando iniciará la promoción"
        },
	      fechaFin: {
          bsonType: "date",
          description: "Fecha de cuando finalizará la promoción"
        },
        estado: {
          bsonType: "string",
          description: "Estado de la promoción (activo, inactivo, expirada)",
          enum: ["activo", "inactivo", "expirada"]
        },
        imagen: {
          bsonType: ["string", "null"],
          description: "URL de la imagen de la promoción"
        }
      }
    }
  }
})

// INSERTS DE PROMOCION
db.promocion.insertMany([
  {
    _id: "PROMO001",
    nombre: "Martes Cervezas a Mitad de Precio",
    descripcion: "Todas las cervezas nacionales e importadas a 50% de descuento cada martes.",
    fechaInicio: ISODate("2025-07-01T00:00:00Z"),
    fechaFin: ISODate("2025-12-31T23:59:59Z"),
    estado: "activo",
    imagen: null
  },
  {
    _id: "PROMO002",
    nombre: "Cumpleañeros Entran Gratis",
    descripcion: "Si es tu cumpleaños, la entrada es gratis todo el día.",
    fechaInicio: ISODate("2025-01-01T00:00:00Z"),
    fechaFin: ISODate("2026-01-01T00:00:00Z"),
    estado: "activo",
    imagen: null
  },
  {
    _id: "PROMO003",
    nombre: "Lunes 2x1 en Cócteles",
    descripcion: "Disfruta dos cócteles por el precio de uno todos los lunes.",
    fechaInicio: ISODate("2025-07-01T00:00:00Z"),
    fechaFin: ISODate("2025-10-31T23:59:59Z"),
    estado: "activo",
    imagen: null
  },
  {
    _id: "PROMO004",
    nombre: "Hora Feliz",
    descripcion: "Descuentos especiales en bebidas seleccionadas de 18:00 a 20:00 horas.",
    fechaInicio: ISODate("2025-06-01T00:00:00Z"),
    fechaFin: ISODate("2025-12-31T23:59:59Z"),
    estado: "activo",
    imagen: null
  },
  {
    _id: "PROMO005",
    nombre: "Jueves de Botanas Gratis",
    descripcion: "Por cada bebida comprada recibe una botana gratis todos los jueves.",
    fechaInicio: ISODate("2025-07-01T00:00:00Z"),
    fechaFin: ISODate("2025-11-30T23:59:59Z"),
    estado: "activo",
    imagen: null
  },
  {
    _id: "PROMO006",
    nombre: "Descuento Estudiantes",
    descripcion: "20% de descuento presentando credencial de estudiante los miércoles.",
    fechaInicio: ISODate("2025-07-01T00:00:00Z"),
    fechaFin: ISODate("2025-12-31T23:59:59Z"),
    estado: "activo",
    imagen: null
  }
])

// COLECCIONES PARA IoT
// Estas colecciones almacenan información sobre los dispositivos IoT y sus estados


// ESQUEMA PARA EL SENSOR DE TEMPERATURA Y HUMEDAD (DHT11)
// Esta colección almacena lecturas de temperatura y humedad de un sensor IoT 

db.createCollection("iot-dht11_Lecturas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "temperaturaC", "humedad", "fecha", "hora"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Identificador único de la lectura"
        },
        temperaturaC: {
          bsonType: ["double", "int"], // Acepta double o int para la temperatura
          description: "Número de temperatura en grados Celsius de la lectura"
        },
        humedad: {
          bsonType: ["double", "int"], // Acepta double o int para la humedad
          description: "Número de humedad de la lectura"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha de la lectura"
        },
        hora: {
          bsonType: "string",
          description: "Hora de la lectura en formato 24 horas (HH:MM)"
        }
      }
    }
  }
})

// INSERTS PARA EL SENSOR DHT11
db["iot-dht11_Lecturas"].insertMany([
  {
    _id: "DHT11-001",
    temperaturaC: 22.5,
    humedad: 60,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "10:00"
  },
  {
    _id: "DHT11-002",
    temperaturaC: 23.0,
    humedad: 55,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "11:00"
  },
  {
    _id: "DHT11-003",
    temperaturaC: 21.5,
    humedad: 65,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "12:00"
  }
])

// ESQUEMA PARA EL SENSOR DE DISTANCIA ULTRASÓNICA (HC-SR04)
db.createCollection("iot-hc-sr04_Lecturas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "distanciaCM", "fecha", "hora"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Identificador único de la lectura"
        },
        distanciaCM: {
          bsonType: ["double", "int"],
          description: "Distancia de detección en centímetros"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha de la lectura"
        },
        hora: {
          bsonType: "string",
          description: "Hora de la lectura en formato 24 horas (HH:MM)"
        }
      }
    }
  }
})

// INSERTS PARA EL SENSOR HC-SR04
db["iot-hc-sr04_Lecturas"].insertMany([
  {
    _id: "HC-SR04-001",
    distanciaCM: 150.5,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "10:00"
  },
  {
    _id: "HC-SR04-002",
    distanciaCM: 200.0,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "11:00"
  },
  {
    _id: "HC-SR04-003",
    distanciaCM: 180.5,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "12:00"
  }
])

// ESQUEMA PARA EL SENSOR DE TEMPERATURA INFRARROJO (MLX90615)
db.createCollection("iot-mlx90615_Lecturas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "temperaturaC", "fecha", "hora"],
      properties: {
        _id: {
          bsonType: "string",
          description: "Identificador único de la lectura"
        },
        temperaturaC: {
          bsonType: ["double", "int"],
          description: "Número de temperatura en grados Celsius de la lectura"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha de la lectura"
        },
        hora: {
          bsonType: "string",
          description: "Hora de la lectura en formato 24 horas (HH:MM)"
        }
      }
    }
  }
})

// INSERTS PARA EL SENSOR MLX90615
db["iot-mlx90615_Lecturas"].insertMany([
  {
    _id: "MLX90615-001",
    temperaturaC: 25.0,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "10:00"
  },
  {
    _id: "MLX90615-002",
    temperaturaC: 26.5,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "11:00"
  },
  {
    _id: "MLX90615-003",
    temperaturaC: 24.0,
    fecha: ISODate("2025-07-01T00:00:00Z"),
    hora: "12:00"
  }
])