import { Component, NgModule } from '@angular/core';
import { ComandaserviceService } from './comandaservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ComandaserviceService],

})
export class AppComponent {
  title = 'front-end';
  comanda: any[] = [];
  listaMeseros: any[] = [];
  listaPlatillos: any[] = [];
  listaBebidas: any[] = [];
  listaPaquetes: any[] = [];
  listaSecuencia: any[] = [];
  listaComandaPlatillos: any[] = [];
  listaComandaBebidas: any[] = [];
  listaComandaPaquete: any[] = [];
  currentDate = new Date();
  idMesero = 1;
  mostrarTicket = false;
  mostrarTicketId = false;
  subtotal = 0;
  total = 0;
  formaPago = "VISA";
  propina = "0.1";
  btnCobro = false;
  constructor(private service: ComandaserviceService) {
    service.getMeseros().then(
      (meseros) => {
        this.listaMeseros = meseros;
      }
    )
    service.getPlatillos().then(
      (platillos) => {
        this.listaPlatillos = platillos;
      }
    )
    service.getBebidas().then(
      (bebidas) => {
        this.listaBebidas = bebidas;
      }
    )
    service.getPaquetes().then(
      (paquete) => {
        this.listaPaquetes = paquete;
      }
    )
    service.getSecuencia().then(
      (secuencia) => {
        this.listaSecuencia = secuencia;
      }
    )
  }
  mandarCocina() {
    /* console.log("Mandar a Cocina") */
    const comanda = {
      idComanda: this.listaSecuencia[0].Secuencia,
      idMesero: this.idMesero,
    };
    this.btnCobro = true;
    this.service.postComanda(comanda).then(
      (success) => {
        this.guardarOrden()
      }
    )
  }
  meseroChange(event: any) {
    /* console.log = event.target.value; */
    this.idMesero = event.target.value;
  }
  guardarOrden() {
    this.listaComandaPlatillos.forEach(comandaPlatillos => {
      this.service.postComandaPlatillos(comandaPlatillos).then(
        (responseComandaPlatillos) => {
          console.log(responseComandaPlatillos);
        }
      )
    })
    this.listaComandaBebidas.forEach(comandaBebidas => {
      this.service.postComandaBebidas(comandaBebidas).then(
        (responseComandaBebidas) => {
          console.log(responseComandaBebidas);
        }
      )
    })
    this.listaComandaPaquete.forEach(comandaPaquete => {
      this.service.postComandaPaquetes(comandaPaquete).then(
        (responseComandaPaquetes) => {
          console.log(responseComandaPaquetes);
        }
      )
    })
        /* this.service.postComandaBebidas(comandaBebidas).then(
      (responseComandaBebidas) => {
        console.log(responseComandaBebidas);
      }
    )
    this.service.postComandaPaquetes(comandaPaquete).then(
      (responseComandaPaquetes) => {
        console.log(responseComandaPaquetes);
      }
    ) */
  }
    /**
   *PLATILLOS
   */
  changeCantidadPlatillo(event: any, idPlatillo: number) {
    const cantidad = event.target.value;
    const indice = this.listaComandaPlatillos.findIndex(f => f.idPlatillo == idPlatillo);
    const platillo = {
      "idPlatillo": idPlatillo,
      "cantidad": cantidad,
      "idComanda": this.listaSecuencia[0].Secuencia
    };
    if (indice != -1) {
      this.listaComandaPlatillos.splice(indice, 1, platillo)
    } else {
      this.listaComandaPlatillos.push(platillo)
    }
    /* console.log(this.listaComandaPlatillos) */
  }
  /**
   *FIN PLATILLOS
   */
  /**
   *BEBIDAS
   */
    changeCantidadBebida(event: any, idBebida: number) {
    const cantidad = event.target.value;
    const indice = this.listaComandaBebidas.findIndex(f => f.idBebida == idBebida);
    const bebida = {
      "idBebida": idBebida,
      "cantidad": cantidad,
      "idComanda": this.listaSecuencia[0].Secuencia
    };
    if (indice != -1) {
      this.listaComandaBebidas.splice(indice, 1, bebida)
    } else {
      this.listaComandaBebidas.push(bebida)
    }
    /* console.log(this.listaComandaBebidas) */
  }
    /**
    *FIN BEBIDAS
   */
    /**
   *PAQUETES
   */
  changeCantidadPaquete(event: any, idPaquete: number) {
    const cantidad = event.target.value;
    const indice = this.listaComandaPaquete.findIndex(f => f.idPaquete == idPaquete);
    const paquete = {
      "idPaquete": idPaquete,
      "cantidad": cantidad,
      "idComanda": this.listaSecuencia[0].Secuencia
    };
    if (indice != -1) {
      this.listaComandaPaquete.splice(indice, 1, paquete)
    } else {
      this.listaComandaPaquete.push(paquete)
    }
    /* console.log(this.listaComandaPaquete) */
  }
      /**
   *FIN PAQUETES
   */
  ordenTicket() {
    this.mostrarTicket = true;
    /**
     * Obtener ticket
     */
    this.service.obtenerTicket({
      idComanda: this.listaSecuencia[0].Secuencia
    }).then(
      (success) => {
        this.subtotal=success[0].subtotal
      }
    )
  }
  pagar() {
    const comanda = {
      idComanda: this.listaSecuencia[0].Secuencia,
      formaPago: this.formaPago,
      propina: this.propina,
      total: this.total
    }
    this.service.putComanda(comanda).then(
      (success) => {
        console.log(success)
        this.service.postComandaById(this.listaSecuencia[0].Secuencia).then(
          (comandaId) => {
            this.comanda = comandaId;
            this.mostrarTicketId = true;
          }
        )
      }
    )
  }
  calcularPropina(event: any) {
    console.log(event.target.value)
    this.propina = event.target.value;
    this.total = this.subtotal*(1+parseFloat(this.propina));
  }
  changePago(event: any) {
    console.log(event.target.value)
    this.formaPago = event.target.value;
  }
}



