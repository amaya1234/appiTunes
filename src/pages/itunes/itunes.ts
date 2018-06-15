import { Component } from '@angular/core';
import { ItunesService } from '../../app/bitunes.service';
import { Resultado } from '../../app/resultado.model';
import { Observable } from 'rxjs/Observable';
import { Cancion } from '../../app/cancion.model';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'itunes',
  templateUrl: 'itunes.html',
  providers: [ItunesService]
})
export class IonicComponent {

  busqueda_usuario : string;
  array_canciones : Cancion[];
  cargado : boolean;

  constructor( public itunes_service:ItunesService, public storage : Storage) {
    console.log ("La página 'itunes.html' se va a cargar");
    this.busqueda_usuario="";
    this.cargado = false;
  }

  buscar ()
  {
    this.storage.set ('termino_busqueda',this.busqueda_usuario);
    console.log ("Término de búsqueda guardado");
    this.storage.get ('termino_busqueda').then(leido => {console.log("leido = "+leido)});

    console.log ("Ha tocado a buscar " + this.busqueda_usuario);
    let resultado : Observable<Resultado> = 
    this.itunes_service.buscar(this.busqueda_usuario);
    
    resultado.subscribe (jsoncanciones => this.procesarCanciones (jsoncanciones));
 
  }
  consulta()
  {
    console.log ("Toco consultar");
    this.storage.get('termino_busqueda').then (leido => {console.log("leido = " + leido)});
  }

  procesarCanciones ( jsoncanciones : any)
  {
    let infocanciones : Resultado = <Resultado>jsoncanciones;
    this.array_canciones =  infocanciones.results;
    this.cargado = true;
    
    console.log ("Nombre del primero " + this.array_canciones[0].artistName);
  }
  
}
