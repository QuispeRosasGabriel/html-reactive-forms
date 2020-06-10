import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuarioinvalido } from '../usuarioinvalido';
@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true,
      };
    }
    return null;
  }
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  existeUsuario(
    control: FormControl
  ): Promise<Usuarioinvalido> | Observable<Usuarioinvalido> {
    //validando a que se toque el campo antes de funcionar
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((res, rej) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          res({ existe: true });
        } else {
          res(null);
        }
      }, 3000);
    });
  }
}
