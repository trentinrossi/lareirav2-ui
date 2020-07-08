import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasalRoutingModule } from './casal-routing.module';
import { CasalPesquisaComponent } from './casal-pesquisa/casal-pesquisa.component';
import { CasalCadastroComponent } from './casal-cadastro/casal-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule, MessagesModule, MessageModule, ConfirmDialogModule, TableModule } from 'primeng';


@NgModule({
    declarations: [CasalPesquisaComponent, CasalCadastroComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        MessagesModule,
        MessageModule,
        ConfirmDialogModule,
        TableModule,
        CasalRoutingModule
    ]
})
export class CasalModule { }
