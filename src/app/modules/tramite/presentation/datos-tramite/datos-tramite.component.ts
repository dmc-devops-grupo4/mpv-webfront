import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { VistaPdfComponent } from 'src/app/shared/components/vista-pdf/vista-pdf.component';
import { TramitesService } from '../../application/tramites.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Tramite } from '../../domain/tramite';
import { MaestrosService } from 'src/app/core/services/maestros.service';

@Component({
  selector: 'app-datos-tramite',
  templateUrl: './datos-tramite.component.html',
  styleUrls: ['./datos-tramite.component.scss']
})
export class DatosTramiteComponent implements OnInit {

  tramite: Tramite;

  constructor(
    private readonly configService : ConfigService,
    private readonly authService: AuthService,
    private readonly tramitesService : TramitesService,
    private readonly maestrosService : MaestrosService,
    private readonly route: ActivatedRoute,
    private readonly dialogService : DialogService,
    private readonly router : Router,
    private readonly modalService: NgbModal,
  )
  {
    this.configService.config = {
      layout :{
        hidden: false
      }
    };


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:any) => {
      const {params} = paramMap;
      this.tramitesService.obtenerTramite(params.idTramite).subscribe({
        next: (data) => {
          this.tramite = data;
        },
        error: () => {
          this.dialogService.mensajeError("Ocurrió un problema al intentar obtener los datos del trámite")
          .then(() => {
            this.router.navigate(['/tramites']);
          })
        }
      });
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

}
