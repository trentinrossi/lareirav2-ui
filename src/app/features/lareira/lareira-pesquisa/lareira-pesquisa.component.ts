import { LareiraDTO } from './../../../shared/models/lareira.dto';
import { AuthService } from './../../../core/auth/auth.service';
import { LareiraService } from './../lareira.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng';

@Component({
    selector: 'app-lareira-pesquisa',
    templateUrl: './lareira-pesquisa.component.html',
    styleUrls: ['./lareira-pesquisa.component.css']
})
export class LareiraPesquisaComponent implements OnInit {

    items: LareiraDTO[];
    columns: any[];

    constructor(
        private service: LareiraService,
        private confirmation: ConfirmationService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {

        this.columns = [
            { field: 'nome', header: 'Nome' },
            { field: 'cidade', header: 'Cidade' },
            { field: 'endereco', header: 'Endereço' },
            { field: 'bairro', header: 'Bairro' },
            { field: 'cep', header: 'CEP' },
            { field: 'telefone', header: 'Telefone' }
        ];

        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .subscribe(resp => {
                this.items = resp.content;
            });
    }

    confirmarExclusao(lareira: any) {
        console.log(lareira);

        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(lareira);
            }
        });
    }

    excluir(lareira: any) {
        this.service.delete(lareira.id)
            .subscribe(() => {
                this.findAll();
                this.messageService.add({ severity: 'success', detail: 'Lareira excluída com sucesso!' });
            });
    }

}
