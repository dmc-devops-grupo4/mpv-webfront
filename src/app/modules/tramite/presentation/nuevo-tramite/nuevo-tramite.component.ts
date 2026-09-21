import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/config/config.service';
import { ValidateFileSize } from 'src/app/shared/utils/file';
import { Oficina, TipoDocumento } from '../../domain/tramite';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TramitesService } from '../../application/tramites.service';
import { Archivo } from 'src/app/core/models/maestros/archivo';
import { VistaPdfComponent } from 'src/app/shared/components/vista-pdf/vista-pdf.component';
import { MaestrosService } from 'src/app/core/services/maestros.service';
import { Solicitud } from '../../domain/solicitud';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.scss']
})
export class NuevoTramiteComponent implements OnInit {
  form : FormGroup | any;

  // listaDocumentos: DocumentoAdjunto[] = [];
  listaDocumentos: Archivo[] = [];
  // listaAnexos: DocumentoAdjunto[] = [];
  // listaAdjuntos: DocumentoAdjunto[] = [];

  listaOficinas: Oficina[] = [];
  listaTiposDocumento: TipoDocumento[] = [];
  // datosContribuyente : ContribuyenteEntity;

  constructor(
    private readonly configService : ConfigService,
    private modalService: NgbModal,
    private readonly router : Router,
    private readonly dialogService: DialogService,
    private readonly tramitesService: TramitesService,
    private readonly maestrosService: MaestrosService,
    private readonly authService: AuthService,
  ) {
    this.configService.config = {
      layout :{
        hidden: false
      }
    };
  }

  ngOnInit(): void {
    this.tramitesService.listarOficinas().subscribe((data) => {
      this.listaOficinas = data;
    });

    this.tramitesService.listarTiposDocumento().subscribe((data) => {
      this.listaTiposDocumento = data;
    });

    this.setForm();
  }

  setForm(){
    this.form = new FormGroup({
      idOficina : new FormControl('', [Validators.required]),
      idTipoDocumento : new FormControl('', [Validators.required]),
      nroDocumento : new FormControl('', [Validators.required, Validators.maxLength(150)]),
      asunto : new FormControl('', [Validators.required, Validators.maxLength(500)]),
      observacion : new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });
  }

  formInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return (control).invalid && (control.dirty || control.touched);
  }

  onChangeInputPdf(event : any) : any {
    if (event.target.files.length === 0)
      return

    if (event.target.files[0].type !== 'application/pdf') {
      event.target.value = "";
      return this.dialogService.mensajeError("Solo puede adjuntar archivos PDF");
    }

    const msg = ValidateFileSize(event.target.files[0]);
    if(msg !== '') {
      event.target.value = "";
      return this.dialogService.mensajeError(msg);
    }

    this.maestrosService.subirArchivo(event.target.files[0])
    .subscribe({
      next: (response) => {
        event.target.value = "";
        this.listaDocumentos.push(response);
      },
      error: (error) => {
        event.target.value = "";
        this.dialogService.mensajeError('Error al guardar el archivo');
      },
    });

  }

  eliminarPdf(index: any) {
    this.dialogService.mensajeConfirmar('¿Está seguro de eliminar el documento seleccionado?', 'Eliminar')
    .then(() => {
      this.listaDocumentos.splice(index, 1);
    });
  }

  verDocumento(idArchivo: string, nombreArchivo: string) {
    this.maestrosService.obtenerArchivo(idArchivo).subscribe({
      next: (file: Blob) => {
        const modalRef = this.modalService.open(VistaPdfComponent, { size: 'xl', scrollable: true });
        const urlPdf = URL.createObjectURL(file);
        modalRef.componentInstance.pdfUrl = urlPdf;
        modalRef.componentInstance.titleModal = `Vista Previa - ${nombreArchivo}`;
      },
      error: () => {
        this.dialogService.mensajeError('Problemas para descargar Pdf');
      }
    });
  }

  enviar() : any {
    if (this.form.invalid){
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      return this.dialogService.mensajeError('Debe ingresar todos los campos obligatorios');
    }

    if (this.listaDocumentos.length === 0)
      return this.dialogService.mensajeError('Debe ingresar al menos un Documento');

    let solicitud = this.form.value as Solicitud

    solicitud.idUsuario = this.authService.getIdUsuario();
    solicitud.archivosId = this.listaDocumentos.map(archivo => archivo.idArchivo);

    this.dialogService.mensajeConfirmar(`¿Está seguro de enviar los datos ingresados?`,"Enviar solicitud")
      .then(() => {
        this.tramitesService.enviarSolicitud(solicitud).subscribe({
          next: (data) => {
            this.dialogService.mensajeOk("Su solicitud fue enviada con éxito.", "Enviado!")
            .then((e) => {
              this.router.navigate(['tramites']);
            });

          },
          error: () => {
            this.dialogService.mensajeError('Problemas para realizar el guardado de datos');
          }
        });

      });
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

  formatBytes(bytes:any, decimals:number = 2) {
    if (!bytes || bytes == 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  campareStrings(str1:string, str2:string) {
    const cadena1 = str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const cadena2 = str2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return cadena1 === cadena2 ? true : false;
  }

}
