import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  public get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  public get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }

  public get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      correo: [
        '',
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2-3}$'),
      ],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
    });
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
