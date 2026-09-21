import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { TipoDocIdentidadEnum } from 'src/app/core/constants/tipo-doc-identidad.enum';
import { CustomValidators } from 'src/app/shared/utils/custom-validators';
import { MaestrosService } from 'src/app/core/services/maestros.service';
import { Departamento, Distrito, Provincia, Ubigeo } from 'src/app/core/models/maestros/ubigeo';
import { TipoPersona } from 'src/app/core/models/maestros/tipo-persona';
import { TipoDocIdentidad } from 'src/app/core/models/maestros/tipo-doc-identidad';
import { TipoPersonaEnum } from 'src/app/core/constants/tipo-persona.enum';
import { RegistroService } from 'src/app/core/services/registro.service';
import { RegistroRequest } from 'src/app/core/models/registro-request';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  form : FormGroup | any;

  listaTiposPersona: Array<TipoPersona> = []
  listaTiposDocIdentidad: Array<TipoDocIdentidad> = []
  listaUbigeos: Ubigeo[] = [];
  listaDepartamentos: Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaDistritos: Distrito[] = [];

  readonlyDatosRepresentante: boolean
  maxLengthNroDocumento = 8 // dni

  TIPO_PERSONA = TipoPersonaEnum
  TIPO_DOC_IDENTIDAD = TipoDocIdentidadEnum

  constructor(
    private readonly fb: FormBuilder,
    private readonly configService : ConfigService,
    private readonly router: Router,
    private readonly registroService: RegistroService,
    private readonly maestrosService: MaestrosService,
    private readonly dialogService: DialogService,
  ) {
    this.configService.config = {
      layout :{
        hidden: true
      }
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit() {
    this.maestrosService.listarTiposPersona().subscribe((response) => {
      this.listaTiposPersona = response
    });

    this.maestrosService.listarTiposDocIdentidad().subscribe((response) => {
      this.listaTiposDocIdentidad = response
    });

    this.maestrosService.listarUbigeo().subscribe((response) => {
      this.listaUbigeos = response

      const seen = new Set<string>();
      this.listaDepartamentos = response.map(ubigeo => ({
                                          codigo: ubigeo.codUbigeo.substring(0, 2),
                                          nombre: ubigeo.departamento
                                        } as Departamento))
                                        .filter(item => {
                                          const duplicate = seen.has(item.codigo);
                                          seen.add(item.codigo);
                                          return !duplicate;
                                        });
    });

    this.setFormPersonaNatural();
  }

  setFormPersonaNatural(){
    this.form = this.fb.group({
      idTipoPersona : [this.TIPO_PERSONA.PERSONA_NATURAL, [Validators.required]],
      idTipoDocIdentidad : [this.TIPO_DOC_IDENTIDAD.DNI, [Validators.required]],
      nroDocumento : ['', [Validators.required, CustomValidators.hasNumbersOnly, CustomValidators.exactLength(this.maxLengthNroDocumento)]],
      nombres : ["", [Validators.required]],
      apellidoPaterno : ["", [Validators.required]],
      apellidoMaterno : ["", [Validators.required]],
      direccion : ["", [Validators.required]],

      departamento : ["", [Validators.required]],
      provincia : ["", [Validators.required]],
      distrito : ["", [Validators.required]],

      correo : ["", [Validators.required, CustomValidators.validatorEmail]],
      confirmarCorreo : ["", [
        Validators.required,
        CustomValidators.validatorMatchEmail('correo')
      ]],
      celular : ["", [Validators.required]],
      ruc : ["", [CustomValidators.exactLength(11), Validators.pattern("^[0-9]*$")]],
      razonSocial : [""],
      password : ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(40),
        CustomValidators.hasNumber,
        CustomValidators.hasCapitalCase,
        CustomValidators.hasSmallCase,
        CustomValidators.hasSpecialCharacters,
      ]],
      confirmarPassword : ["", [
        Validators.required,
        CustomValidators.validatorMatchPassword('password')
      ]]
    });
  }

  onChangeTipoPersona(event: any){

  }

  onChangeTipoDocIdentidad(event: any){

  }

  listarProvincias(codDepartamento: string) : Provincia[] {
    const seen = new Set<string>();
    return this.listaUbigeos.filter(ubigeo => ubigeo.codUbigeo.startsWith(codDepartamento))
                          .map(ubigeo => ({
                            codigo: ubigeo.codUbigeo.substring(2, 4),
                            nombre: ubigeo.provincia
                          } as Provincia))
                          .filter(item => {
                            const duplicate = seen.has(item.codigo);
                            seen.add(item.codigo);
                            return !duplicate;
                          });
  }

  listarDistritos(codDepartamento: string, codDistrito: string) : Distrito[] {
    const seen = new Set<string>();
    return this.listaUbigeos.filter(ubigeo => ubigeo.codUbigeo.startsWith(`${codDepartamento}${codDistrito}`))
                          .map(ubigeo => ({
                            codigo: ubigeo.codUbigeo.substring(4, 6),
                            nombre: ubigeo.distrito
                          } as Distrito))
                          .filter(item => {
                            const duplicate = seen.has(item.codigo);
                            seen.add(item.codigo);
                            return !duplicate;
                          });
  }

  onChangeDepartamento(codDepartamento: string){
    if(codDepartamento != ""){
        this.listaProvincias = this.listarProvincias(codDepartamento);
        this.form.controls["provincia"].setValue("");
    }else{
      this.listaProvincias = [];
      this.form.controls["provincia"].setValue("");
    }

    this.listaDistritos = [];
    this.form.controls["distrito"].setValue("");
  }

  onChangeProvincia(codDepartamento: string, codProvincia: string){
    if(codProvincia != "" && codDepartamento != ""){
        this.listaDistritos = this.listarDistritos(codDepartamento, codProvincia);
        this.form.controls["distrito"].setValue("");
    }else{
      this.listaDistritos = [];
      this.form.controls["distrito"].setValue("");
    }
  }


  registrar(): any {
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      return this.dialogService.mensajeError("Por favor revise los datos ingresados en el formulario", "Formulario inválido");
    }

    const registroRequest = this.form.value as RegistroRequest;
    registroRequest.idTipoPersona = Number(registroRequest.idTipoPersona)
    registroRequest.idTipoDocIdentidad = Number(registroRequest.idTipoDocIdentidad)
    registroRequest.codUbigeo = `${this.form.get("departamento").value}${this.form.get("provincia").value}${this.form.get("distrito").value}`;

    console.log("registroRequest => ", registroRequest)
    // return
    this.dialogService.mensajeConfirmar("¿Está seguro de enviar los datos ingresados?", "Confirmación").then(() => {

      this.registroService.registrarPersona(registroRequest).subscribe({
        next: (result: any) => {
          if(result.error){
            this.dialogService.mensajeError(result.mensage ?? "Hubo un error al registrar el usuario", result.error)
            return
          }
          // const textHtml = `Estimado usuario, se le ha enviado a su correo ${result.data.email} con el asunto de “Confirmación de usuario” para que pueda validar su correo y activar su cuenta para usar este servicio. Se recomienda revisar en su bandeja principal o spam. Tiene plazo hasta el ${result.data.fechaExpiraVerificacion} para activar su cuenta`
          this.dialogService.mensajeOk("Se ha registrado correctamente", "Usuario registrado")
          .then(() => {
            this.router.navigate(['/auth/login']);
          });

        },
        error: (error: any) => {
          this.dialogService.mensajeError('Surgió un error la intentar guardar los datos','Error')
        }
      });
    });
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
    const control = this.form.get(controlName);
    return (control).invalid && (control.dirty || control.touched);
  }

  campareStrings(str1:string, str2:string) {
    const cadena1 = str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const cadena2 = str2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return cadena1 === cadena2 ? true : false;
  }
}
