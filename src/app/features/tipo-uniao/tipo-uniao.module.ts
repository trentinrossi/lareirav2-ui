import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoUniaoRoutingModule } from './tipo-uniao-routing.module';
import { TipoUniaoPesquisaComponent } from './tipo-uniao-pesquisa/tipo-uniao-pesquisa.component';
import { TipoUniaoCadastroComponent } from './tipo-uniao-cadastro/tipo-uniao-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule, MessageModule, MessagesModule, ConfirmDialogModule, TableModule } from 'primeng';

@NgModule({
    declarations: [TipoUniaoPesquisaComponent, TipoUniaoCadastroComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        MessagesModule,
        MessageModule,
        ConfirmDialogModule,
        TableModule,
        TipoUniaoRoutingModule
    ]
})
export class TipoUniaoModule { }
