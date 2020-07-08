import { MessageService } from 'primeng/api';
import { TipoUniaoService } from './../tipo-uniao.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { TipoUniaoDTO } from 'src/app/shared/models/tipo-uniao.dto';
import { ConfirmationService } from 'primeng';

@Component({
    selector: 'app-tipo-uniao-pesquisa',
    templateUrl: './tipo-uniao-pesquisa.component.html',
    styleUrls: ['./tipo-uniao-pesquisa.component.css']
})
export class TipoUniaoPesquisaComponent implements OnInit {

    items: TipoUniaoDTO[];
    columns: any[];

    constructor(
        private service: TipoUniaoService,
        private confirmation: ConfirmationService,
        private messageService: MessageService,
        private errorHandler: ErrorHandler
    ) { }

    ngOnInit(): void {

        this.columns = [
            { field: 'nome', header: 'Nome' },
            { field: 'descricao', header: 'Descrição' }
        ];

        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .subscribe(resp => {
                this.items = resp.content;
            });
    }

    confirmarExclusao(tipoUniao: any) {
        console.log(tipoUniao);

        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(tipoUniao);
            }
        });
    }

    excluir(tipoUniao: any) {
        this.service.delete(tipoUniao.id)
            .subscribe(() => {
                this.findAll();
                this.messageService.add({ severity: 'success', detail: 'Tipo de União excluída com sucesso!' });
            }, (error => {
                this.errorHandler.handleError(error);
                this.messageService.add({ severity: 'error', detail: error });
            }));
    }

}
