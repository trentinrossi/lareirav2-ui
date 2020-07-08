import { TipoUniaoService } from './../tipo-uniao.service';
import { TipoUniaoDTO } from './../../../shared/models/tipo-uniao.dto';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng';

@Component({
    selector: 'app-tipo-uniao-cadastro',
    templateUrl: './tipo-uniao-cadastro.component.html',
    styleUrls: ['./tipo-uniao-cadastro.component.css']
})
export class TipoUniaoCadastroComponent implements OnInit {

    tipoUniao: TipoUniaoDTO;
    headerPage = '';

    tipoUniaoForm: FormGroup;

    constructor(
        private service: TipoUniaoService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private messageService: MessageService,
        private errorHandler: ErrorHandler
    ) { }

    ngOnInit(): void {
        this.tipoUniaoForm = this.fb.group({
            id: [''],
            nome: ['', [Validators.required]],
            descricao: ['']
        });

        const idTipoUniao = +this.route.snapshot.paramMap.get('id');

        this.headerPage = 'Novo Tipo de União';

        // Protege caso não seja retornado o código
        if (idTipoUniao) {
            this.headerPage = 'Alterar Tipo de União';
            this.service.find(idTipoUniao).subscribe(tipoUniao => this.tipoUniaoForm.patchValue(tipoUniao));
        } else {
            this.tipoUniao = new TipoUniaoDTO();
        }
    }

    get formControls() { return this.tipoUniaoForm.controls; }

    salvar(form: FormControl) {
        if (this.tipoUniaoForm.controls.id.value > 0) {
            this.atualizarTipoUniao();
        } else {
            this.inserirTipoUniao();
        }
    }

    atualizarTipoUniao() {
        this.service.update(this.tipoUniaoForm.controls.id.value, this.tipoUniaoForm.value)
            .subscribe(tipoUniao => {
                this.tipoUniao = tipoUniao;
                this.router.navigate(['/tipo-uniao']);
            }, (error => {
                this.errorHandler.handleError(error);
                this.messageService.add({ severity: 'error', detail: error });
            }));
    }

    inserirTipoUniao() {
        this.service.insert(this.tipoUniaoForm.value)
            .subscribe(tipoUniaoAdicionado => {
                this.router.navigate(['/tipo-uniao']);
            }, (error => {
                this.errorHandler.handleError(error);
                this.messageService.add({ severity: 'error', detail: error });
            }));
    }

}
