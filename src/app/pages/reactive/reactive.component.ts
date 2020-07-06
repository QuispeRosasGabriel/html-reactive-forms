import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  datosAdicionales: FormGroup;
  public valor: FormArray;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  get companeros() {
    return this.forma.get('companero') as FormArray;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      companero: this.fb.array([]),
    });
  }

  add() {
    this.companeros.push(this.fb.control(''));
  }

  crearDatosAdicionales() {
    this.datosAdicionales = this.fb.group({
      nombreAdicional: [''],
      direccionAdicional: [''],
    });
  }

  public guardar() {
    console.log(this.forma.value);
  }

  public agregarPasatiempo() {}
  public agregarCompanero() {
    this.valor = this.forma.get('companero') as FormArray;
    this.crearDatosAdicionales();
    this.valor.push(this.fb.control(this.datosAdicionales));
  }
}
