
const presupuesto = window.prompt('¿Cual es tu presupuesto semanal?')
if (isNaN(presupuesto)) {
  window.location.reload()
}

let cantidadPresupuesto

class Presupesto {
  constructor (presupuesto) {
    this.presupuesto = Number(presupuesto)
    this.restante = Number(presupuesto)
  }

  presupuestoRestante (cantidad = 0) {
    let restante = this.restante -= Number(cantidad)
    return restante
  }
} // fin de clase Presupuesto

class Interfaz {
  insetarPresupuesto (cantidad) {
    const spanPresupuesto = document.getElementById('span-presupuesto')
    const spanCantidad = document.getElementById('span-cantidad')

    if (spanPresupuesto) {
      spanPresupuesto.innerHTML = `${cantidad}`
    }
    if (spanCantidad) {
      spanCantidad.innerHTML = `${cantidad}`
    }
  }// fin de imprimirPresupuesto

  imprimirMensaje (mensaje, tipo) {
    const divMensaje = document.getElementById('mensaje')
    let div = document.createElement('div')
    div.classList.add('text-center', 'alert')
    if (tipo === 'error') {
      div.innerHTML = `${mensaje}`
      divMensaje.classList.add('alert-danger')
    } else {
      div.innerHTML = `${mensaje}`
      div.classList.add('alert-success')
    }
    divMensaje.appendChild(div)
    setTimeout(() => {
      div.remove()
    }, 3000)
  } // fin de imprimirMensaje

  agregarGastoListado (nombre, cantidad) {
    const gastosListado = document.getElementById('gastos').querySelector('ul')
    console.log(gastosListado)
    const li = document.createElement('li')

    li.classList.add('list-group-item', 'list-group-item-secondary', 'd-flex', 'justify-content-between', 'align-items-center')
    li.innerHTML = `${nombre.toUpperCase()} <span class="badge badge-primary badge-pill">${cantidad}</span>`

    gastosListado.appendChild(li)
  } // fin de agregarGastoListado

  // comprueba el presupuesto restante
  presupuestoRestante (cantidad) {
    const restante = document.getElementById('span-cantidad')
    // leermos el presupuesto restante
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad)
    restante.innerHTML = `${presupuestoRestanteUsuario}`

    this.comprobarPresupuesto()
  } // fin de presupuestoRestante

  // cambia de color el presupuesto restante
  comprobarPresupuesto () {
    const presupuestoTotal = cantidadPresupuesto.presupuesto
    const presupuestoRestante = cantidadPresupuesto.restante

    // comprobar el 25% y 50%
    if ((presupuestoTotal / 4) > presupuestoRestante) {
      const restante = document.querySelector('.cantidad')
      restante.style.backgroundColor = '#fdb0b0'
      restante.style.color = '#f73131'
    } else if ((presupuestoTotal / 2) > presupuestoRestante) {
      const restante = document.querySelector('.cantidad')
      restante.style.backgroundColor = '#f7d28d'
      restante.style.color = '#bf8e34'
    }
  }
}// fin de la clase Interfaz

document.addEventListener('DOMContentLoaded', () => {
  if (presupuesto === null || presupuesto === '') {
    window.location.reload()
  } else {
    cantidadPresupuesto = new Presupesto(presupuesto)
    const ui = new Interfaz()
    ui.insetarPresupuesto(cantidadPresupuesto.presupuesto)
  }
})

const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', () => {
  const gasto = document.getElementById('gasto').value
  const cantidad = document.getElementById('cantidad').value

  // instanciar la Interfaz
  const ui = new Interfaz()

  if (gasto === '' || cantidad === '') {
    ui.imprimirMensaje('Hubo un error llena todos los campos', 'error')
    formulario.reset()
  } else {
    ui.imprimirMensaje('Correcto', 'correcto')
    ui.agregarGastoListado(gasto, cantidad)
    ui.presupuestoRestante(cantidad)
    formulario.reset()
  }
})
