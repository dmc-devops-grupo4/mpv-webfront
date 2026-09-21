import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { Departamento, Distrito, Provincia, Ubigeo } from 'src/app/core/models/maestros/ubigeo';
import { AuthService } from 'src/app/core/services/auth.service';
import { Persona } from '../../domain/persona';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MaestrosService } from 'src/app/core/services/maestros.service';
import { PersonaService } from '../../application/persona.service';
import { CustomValidators } from 'src/app/shared/utils/custom-validators';
import { ActualizarPersona } from '../../domain/actualizar-persona';


@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.scss']
})
export class ActualizarDatosComponent implements OnInit {
  form: FormGroup | any;
  persona: Persona;
  tipoPersona:string;

  listaUbigeos: Ubigeo[] = [];
  listaDepartamentos: Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaDistritos: Distrito[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly configService : ConfigService,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private readonly maestrosService: MaestrosService,
    private readonly personaService : PersonaService,
    private readonly router: Router
  ) {
    this.configService.config = {
      layout :{
        hidden: false
      }
    }
  }

  ngOnInit(): void {

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

      this.personaService.obtenerPersona(this.authService.getIdPersona()).subscribe((data) => {
        this.persona = data;
        this.setForm(data)
      });
    });


  }

  setForm(data: Persona){
    this.form = this.fb.group({
      direccion : [data.direccion ?? "", [Validators.required]],
      departamento : ["", [Validators.required]],
      provincia : ["", [Validators.required]],
      distrito : ["", [Validators.required]],
      celular : [data.celular ?? "", [Validators.required]],
      correo : [data.correo ?? "", [Validators.required, CustomValidators.validatorEmail]]
    });

    const codDepartamento = data.ubigeo.codUbigeo.substring(0,2);
    const codProvincia = data.ubigeo.codUbigeo.substring(2,4);
    const codDistrito = data.ubigeo.codUbigeo.substring(4,6);

    this.form.controls["departamento"].setValue(codDepartamento);

    this.listaProvincias = this.listarProvincias(codDepartamento);
    this.form.controls["provincia"].setValue(codProvincia);

    this.listaDistritos = this.listarDistritos(codProvincia, codDepartamento);
    this.form.controls["distrito"].setValue(codDistrito);

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

  guardar(): void {
    if(!this.form.valid){
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.dialogService.mensajeError("Por favor revise los datos ingresados en el formulario", "Formulario inválido");
      return
    }

    const requestData = this.form.value as ActualizarPersona
    requestData.codUbigeo = `${this.form.get("departamento").value}${this.form.get("provincia").value}${this.form.get("distrito").value}`;

    this.dialogService.mensajeConfirmar("¿Está seguro de guardar los datos?", "Actualizar").then(() => {

      this.personaService.actualizar(this.authService.getIdPersona(), requestData).subscribe({
        next: (result: any) => {
            this.dialogService.mensajeOk("Los datos fueron actualizados con éxito", "Actualizado!")
            .then(() => {
              this.router.navigate(['/tramites']);
            });
        },
        error: (error: any) => {
          this.dialogService.mensajeError('Surgió un error la intentar guardar los datos','Oh no!')
        }
      });
    });


  }

  formInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return (control).invalid && (control.dirty || control.touched);
  }

  soloNumeros(event : any) {
    // event.target.value = event.target.value.replace(/[^0-9]/g, '');
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
