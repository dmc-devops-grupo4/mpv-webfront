import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { TipoDocIdentidad } from 'src/app/core/models/maestros/tipo-doc-identidad';
import { TipoPersona } from 'src/app/core/models/maestros/tipo-persona';
import { UsuarioLogin } from 'src/app/core/models/usuario-login';
import { AuthService } from 'src/app/core/services/auth.service';
import { MaestrosService } from 'src/app/core/services/maestros.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : UntypedFormGroup | any;
  loading: boolean = false;
  mensajeError : string = "";

  listaTiposPersona: Array<TipoPersona> = []
  listaTiposDocIdentidad: Array<TipoDocIdentidad> = []

  constructor(
    private readonly configService : ConfigService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private readonly maestrosService: MaestrosService,
  ) {
    this.configService.config = {
      layout: { hidden: true },
    }
  }

  ngOnInit(): void {
    this.setForm();

    this.maestrosService.listarTiposPersona().subscribe((response) => {
      this.listaTiposPersona = response
    });

    this.maestrosService.listarTiposDocIdentidad().subscribe((response) => {
      this.listaTiposDocIdentidad = response
    });
  }

  setForm(){
    this.loginForm = new FormGroup({
      idTipoPersona : new FormControl(1, [Validators.required]),
      ruc : new FormControl(""),
      idTipoDocIdentidad : new FormControl(1, [Validators.required]),
      nroDocumento : new FormControl("", [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(15)]),
      password : new FormControl("", [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.invalid)
      return this.loginForm.markAllAsTouched();

    const user: UsuarioLogin = this.loginForm.value;
    // user.username = user.username.toUpperCase()

    this.loading = true
    this.authService.login(user).subscribe({
      next: (response) => {
        this.loading = false

        if(response?.idUsuario){
          this.authService.saveLoginData(response);
        }else{
          this.dialogService.mensajeError('Datos incorrectos')
        }

      },
      error: (error) => {
        this.loading = false
        this.dialogService.mensajeError('error al iniciar sesion')
      },
    });
  }

  get AnioActual() {
    return new Date().getFullYear();
  }

  soloNumeros(event : any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  formInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return (control).invalid && (control.dirty || control.touched);
  }
}
