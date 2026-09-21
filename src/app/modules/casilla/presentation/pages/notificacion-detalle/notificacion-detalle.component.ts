import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { VistaPdfComponent } from 'src/app/shared/components/vista-pdf/vista-pdf.component';
import { Notificacion } from '../../../domain/notificacion';
import { NotificacionesService } from '../../../application/notificaciones.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-notificacion-detalle',
  templateUrl: './notificacion-detalle.component.html',
  styleUrls: ['./notificacion-detalle.component.scss']
})
export class NotificacionDetalleComponent implements OnInit {

  notificacion : Notificacion
  destinatario:string

  constructor(
    private readonly configService : ConfigService,
    private readonly route: ActivatedRoute,
    private readonly router : Router,
    private readonly notificacionesService : NotificacionesService,
    private readonly dialogService : DialogService,
    private readonly authService: AuthService,
    private readonly modalService: NgbModal,
    ) {
      this.configService.config = {
        layout :{
          hidden: false
        }
      }

      // this.destinatario = `${this.authService.getNombreUsuario()} ${this.authService.getApellidoPaternoUsuario()} ${this.authService.getApellidoMaternoUsuario()}`
      this.destinatario = `NOMBRE DEL DESTINATARIO`
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:any) => {
      const {params} = paramMap;
      this.notificacionesService.obtenerNotificacion(params.idNotificacion).subscribe({
        next: (data) => {
          this.notificacion = data;
          console.dir(data)
        },
        error: () => {
          this.dialogService.mensajeError("Ocurrió un problema al intentar obtener los datos")
          .then(() => {
            this.router.navigate(['/casilla']);
          })
        }
      });

    });
  }

  verDocumento(ruta: string){
    window.open(ruta, '_blank');
  }

}
