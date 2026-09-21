import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { VistaPdfComponent } from './components/vista-pdf/vista-pdf.component';

@NgModule({
  declarations: [
    VistaPdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAccordionModule,
    NgbPaginationModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAccordionModule,
    NgbPaginationModule,
  ]
})
export class SharedModule { }
