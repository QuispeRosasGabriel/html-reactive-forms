import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css'],
})
export class PracticaComponent implements OnInit {
  bancoForm: FormGroup;
  companeroForm: FormGroup;
  valor: any;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  get companeros() {
    return this.bancoForm.get('companero') as FormArray;
  }

  createForm() {
    this.bancoForm = this.fb.group({
      nombre: new FormControl(),
      apellido: new FormControl(),
      direccion: new FormControl(),
      companero: new FormArray([]),
    });
  }

  createFormCompanero() {
    this.companeroForm = this.fb.group({
      nombreComp: new FormControl(),
      apellidoComp: new FormControl(),
      direccionComp: new FormControl(),
    });
  }

  agregarCompanero() {
    const model = {
      nombre: 'aaa',
      apellido: 'ss',
      direccion: 'dd',
    };
    this.valor = this.bancoForm.get('companero') as FormArray;
    this.createFormCompanero();
    this.companeroForm.patchValue(model);
    this.valor.push(this.companeroForm);
    console.log(this.valor);
  }

  enviar() {
    console.log(this.bancoForm.value);
  }
}
