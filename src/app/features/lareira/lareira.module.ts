import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LareiraRoutingModule } from './lareira-routing.module';
import { LareiraPesquisaComponent } from './lareira-pesquisa/lareira-pesquisa.component';
import { LareiraCadastroComponent } from './lareira-cadastro/lareira-cadastro.component';

@NgModule({
    declarations: [LareiraPesquisaComponent, LareiraCadastroComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        LareiraRoutingModule,
        ConfirmDialogModule,
        TableModule
    ]
})
export class LareiraModule { }
