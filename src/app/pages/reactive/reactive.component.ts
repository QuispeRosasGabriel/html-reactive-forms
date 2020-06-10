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
    this.crearListeners();
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

  public get usuarioNoValido() {
    return (
      this.forma.get('usuario').invalid && this.forma.get('usuario').touched
    );
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

  public get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  public get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return pass1 === pass2 ? false : true;
  }

  crearFormulario() {
    this.forma = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this._validadores.noHerrera]],
        correo: [
          '',
          // Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2-3}$'),
        ],
        usuario: ['', , this._validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.formBuilder.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.formBuilder.array([]),
      },
      { validators: this._validadores.passwordsIguales('pass1', 'pass2') }
    );
  }

  crearListeners() {
    // listeners de cada cambio en el formulario
    this.forma.valueChanges.subscribe((valor) => console.log(valor));
    this.forma.statusChanges.subscribe((status) => console.log(status));
    this.forma
      .get('nombre')
      .valueChanges.subscribe((valor) => console.log(valor));
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
