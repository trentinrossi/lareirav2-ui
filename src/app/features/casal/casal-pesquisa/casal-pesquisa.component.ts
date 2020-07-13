import { LazyLoadEvent } from 'primeng/api';
import { CasalService } from './../casal.service';
import { CasalDTO } from './../../../shared/models/casal.dto';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng';

@Component({
    selector: 'app-casal-pesquisa',
    templateUrl: './casal-pesquisa.component.html',
    styleUrls: ['./casal-pesquisa.component.css']
})
export class CasalPesquisaComponent implements OnInit {

    items: CasalDTO[];
    columns: any[];
    totalElements: number;
    loading: boolean;

    constructor(
        private service: CasalService,
        private confirmation: ConfirmationService,
        private messageService: MessageService,
        private errorHandler: ErrorHandler
    ) { }

    ngOnInit(): void {
        this.columns = [
            { field: 'numeroFicha', header: 'Ficha Nro.' },
            { field: 'marido.nome', header: 'Nome Marido' },
            { field: 'marido.sobrenome', header: 'Sobrenome Marido' },
            { field: 'esposa.nome', header: 'Nome Esposa' }
        ];

        this.totalElements = 0;
    }

    findByLazy(event: LazyLoadEvent) {
        this.loading = true;
        console.log(event);
        const pagina = event.first / event.rows;
        let filter = '';
        event.globalFilter === null ? filter = '' : filter = event.globalFilter;
        console.log(event.globalFilter);


        this.service.findAll(pagina, event.rows, '', '', filter)
            .subscribe(resp => {
                this.items = resp.content;
                this.totalElements = resp.totalElements;
                this.loading = false;
            });
    }

    confirmarExclusao(casal: any) {
        console.log(casal);

        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(casal);
            }
        });
    }

    excluir(casal: any) {
        this.service.delete(casal.id)
            .subscribe(() => {
                this.messageService.add({ severity: 'success', detail: 'Casal excluído com sucesso!' });
            }, (error => {
                this.errorHandler.handleError(error);
                this.messageService.add({ severity: 'error', detail: error });
            }));
    }

}
