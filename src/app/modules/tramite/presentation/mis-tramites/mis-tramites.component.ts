import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { TramitesService } from '../../application/tramites.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TipoDocumento, Tramite } from '../../domain/tramite';

@Component({
  selector: 'app-mis-tramites',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.scss']
})
export class MisTramitesComponent implements OnInit {
  modelFechaIni: string;
  modelFechaFin: string;
  form : FormGroup | any;

  page = 1;
  pageSize = 5;
  tramites: Tramite[] = [];
  collectionSize = this.tramites.length;



  constructor(
    private readonly configService : ConfigService,
    private readonly router : Router,
    private readonly tramitesService : TramitesService,
    private readonly authService: AuthService,
    private readonly dialogService : DialogService,
  ) {
    this.configService.config = {
      layout :{
        hidden: false
      }
    };
  }

  ngOnInit(): void {
    this.setForm();
    this.buscarTramites();
  }

  setForm(){
    // this.modelFechaIni = { year: this.defaultDateIni.getFullYear(), month: this.defaultDateIni.getMonth() + 1, day: this.defaultDateIni.getDate() };
    // this.modelFechaFin = { year: this.defaultDateFin.getFullYear(), month: this.defaultDateFin.getMonth() + 1, day: this.defaultDateFin.getDate() };

    this.form = new FormGroup({
      fechaIni : new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0], Validators.required),
      fechaFin : new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      nroDocumento : new FormControl(''),
      asunto : new FormControl(''),
      estado : new FormControl(''),
    });
  }

  limpiar() : any{
    this.setForm();
    this.buscarTramites();
  }

  onSelectFechaIni(event:any) :void {
    this.modelFechaIni = event;
  }
  onSelectFechaFin(event:any) :void {
    this.modelFechaFin = event;
  }

  buscarTramites() : any{
    if (!this.form.get("fechaIni").valid)
      return this.dialogService.mensajeError('Fecha inicial inválida');

    if (!this.form.get("fechaFin").valid)
      return this.dialogService.mensajeError('Fecha final inválida');

    const idUsuario = this.authService.getIdUsuario();
    const fechaIni = this.form.get("fechaIni").value ?? ""
    const fechaFin = this.form.get("fechaFin").value ?? ""
    const nroDocumento = this.form.get("nroDocumento").value ?? "";
    const asunto = this.form.get("asunto").value ?? "";
    const estado = this.form.get("estado").value != "" ? this.form.get("estado").value : null;


    this.tramitesService.listarTramitesPorFiltros(idUsuario, fechaIni, fechaFin, nroDocumento, asunto, estado)
    .subscribe((list) => {
      this.tramites = list.map((tramite, i) => ({id: i + 1, ...tramite}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        this.collectionSize = list.length;
    });
  }

  dateFormat(object: NgbDateStruct) : string {
    if (object === null || object === undefined)
      return '';

    const year = object.year;
    const month = object.month <= 9 ? '0' + object.month : object.month;
    const day = object.day <= 9 ? '0' + object.day : object.day;
    return year + "-" + month + "-" + day;
}

}
