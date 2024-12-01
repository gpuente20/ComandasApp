import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class ComandaserviceService {
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
  postComanda(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://localhost:8080/comandaRoute/comanda`, datos,{})
    );
    console.info(retorno);
    return retorno;
  }
  putComanda(datos: any) {
    const retorno = firstValueFrom(
      this.httpClient.put<any>(`http://localhost:8080/comandaRoute/comanda`, datos, {})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaById(idComanda:number): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://localhost:8080/comandaRoute/comandaId`,{idComanda})
    );
    console.info(retorno);
    return retorno;
  }
  getMeseros(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://localhost:8080/comandaRoute/mesero`,{})
    );
    console.info(retorno);
    return retorno;
  }
  getPlatillos(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://localhost:8080/comandaRoute/Platillos`,{})
    );
    console.info(retorno);
    return retorno;
  }
  getBebidas(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://localhost:8080/comandaRoute/Bebidas`,{})
    );
    console.info(retorno);
    return retorno;
  }
  getPaquetes(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://localhost:8080/comandaRoute/Paquete`,{})
    );
    console.info(retorno);
    return retorno;
  }
  getSecuencia(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://localhost:8080/comandaRoute/idComanda`,{})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaPlatillos(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://localhost:8080/comandaRoute/ComandaPlatillos`, datos,{})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaBebidas(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://localhost:8080/comandaRoute/ComandaBebidas`,datos,{})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaPaquetes(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://localhost:8080/comandaRoute/ComandaPaquetes`,datos,{})
    );
    console.info(retorno);
    return retorno;
  }
  obtenerTicket(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://localhost:8080/comandaRoute/obtenerTicket`,datos,{})
    );
    console.info(retorno);
    return retorno;
  }
}

