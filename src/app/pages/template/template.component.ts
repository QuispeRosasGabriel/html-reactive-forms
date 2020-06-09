import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: 'M',
  };

  paises: any[];
  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    this._countryService.getPaises().subscribe((data) => {
      this.paises = data;
      this.paises.unshift({
        nombre: '[Seleccione un país]',
        codigo: '',
      });
    });
  }

  guardar(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    console.log(form.value);
  }
}
