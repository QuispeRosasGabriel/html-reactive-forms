import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getPaises() {
    let url = 'https://restcountries.eu/rest/v2/lang/es';
    return this.http.get(url).pipe(
      map((resp: any[]) => {
        return resp.map((pais) => {
          return {
            nombre: pais.name,
            codigo: pais.alpha3Code,
          };
        });
      })
    );
  }
}
