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

  constructor(
    private formBuilder: FormBuilder,
    private _validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit(): void {}

  public get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

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

  public get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito').invalid &&
      this.forma.get('direccion.distrito').touched
    );
  }

  public get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad').invalid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this._validadores.noHerrera]],
      correo: [
        '',
        // Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2-3}$'),
      ],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.formBuilder.array([]),
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }

    //posteo de la informacion
    this.forma.reset({
      nombre: 'Juancho',
      apellido: 'Perez',
      correo: 'juanperz123@gmail.com',
      direccion: {
        distrito: 'Otario',
        ciudad: 'Otawa',
      },
    });
  }

  cargarData() {
    this.forma.reset({
      nombre: 'Juancho',
      apellido: 'Perez',
      correo: 'juanperz123@gmail.com',
      direccion: {
        distrito: 'Otario',
        ciudad: 'Otawa',
      },
    });
    //insertar al arreglo de forma dinamica
    ['Comer', 'Dormir'].forEach((valor) =>
      this.pasatiempos.push(this.formBuilder.control(valor))
    );
  }
}
