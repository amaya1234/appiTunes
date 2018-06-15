import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Resultado } from "./resultado.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ItunesService {

    constructor (public http : HttpClient)
    {

    }
    buscar (busqueda:string):Observable<Resultado>
    {
        let resultado : Observable<Resultado>;

        resultado = this.http.get<Resultado>("https://itunes.apple.com/search?term=" + busqueda + "&media=music&limit=20");
        
        return resultado;
    }

}