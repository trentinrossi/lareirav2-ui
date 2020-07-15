import { TipoUniaoDTO } from './../../../shared/models/tipo-uniao.dto';
import { TipoUniaoService } from './../../tipo-uniao/tipo-uniao.service';
import { LareiraDTO } from './../../../shared/models/lareira.dto';
import { CasalDTO } from './../../../shared/models/casal.dto';
import { CasalService } from './../casal.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng';
import { LareiraService } from '../../lareira/lareira.service';

@Component({
    selector: 'app-casal-cadastro',
    templateUrl: './casal-cadastro.component.html',
    styleUrls: ['./casal-cadastro.component.css']
})
export class CasalCadastroComponent implements OnInit {

    casal: CasalDTO;
    lareiras: LareiraDTO[];
    casaisPadrinhos: CasalDTO[];
    tiposUniao: TipoUniaoDTO[];
    headerPage = '';

    editForm = this.fb.group({
        id: [],
        numeroFicha: [null, [Validators.required]],
        foneFixo: [],
        dataUniao: [],
        memorando: [],
        lareiraId: [null, [Validators.required]],
        tipoUniaoId: [null, [Validators.required]],
        tipoUniao: [],
        casalPadrinhoId: [],
        casalPadrinho: [],
        lareira: [],
        marido: this.fb.group({
            dataNascimento: [],
            email: [],
            id: [],
            nome: [],
            problemaSaude: [],
            profissao: [],
            sobrenome: [],
            telCelular: []
        }),
        esposa: this.fb.group({
            dataNascimento: [],
            email: [],
            id: [],
            nome: [],
            problemaSaude: [],
            profissao: [],
            sobrenome: [],
            telCelular: []
        }),
        endereco: this.fb.group({
            bairro: [],
            cep: [],
            cidade: [],
            estado: [],
            id: [],
            numero: [],
            rua: []
        }),
        filhos: []
    });

    constructor(
        private service: CasalService,
        private lareiraService: LareiraService,
        private tipoUniaoService: TipoUniaoService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private messageService: MessageService,
        private errorHandler: ErrorHandler
    ) { }

    ngOnInit(): void {

        const idCasal = +this.route.snapshot.paramMap.get('id');

        this.headerPage = 'Novo Casal';

        // Protege caso não seja retornado o código
        if (idCasal) {
            this.headerPage = 'Alterar Casal';
            this.service.find(idCasal).subscribe(casal => this.updateForm(casal));
        } else {
            this.casal = new CasalDTO();
        }
    }

    searchLareiras(event) {
        this.lareiraService.findAll().subscribe(data => {
            this.lareiras = data.content;
        });
    }

    lareiraSelecionada(event) {
        this.editForm.controls.lareiraId.setValue(event.id);
    }

    searchTiposUniao(event) {
        this.tipoUniaoService.findAll().subscribe(data => {
            this.tiposUniao = data.content;
        });
    }

    tipoUniaoSelecionado(event) {
        this.editForm.controls.tipoUniaoId.setValue(event.id);
    }

    searchCasais(event) {
        this.service.findAll(0, 1000, 'id', 'ASC', '').subscribe(data => {
            this.casaisPadrinhos = data.content;
        });
    }

    casalPadrinhoSelecionado(event) {
        this.editForm.controls.casalPadrinhoId.setValue(event.id);
    }

    updateForm(casal: CasalDTO): void {
        this.editForm.patchValue({
            id: casal.id,
            numeroFicha: casal.numeroFicha,
            foneFixo: casal.foneFixo,
            dataUniao: casal.dataUniao,
            memorando: casal.memorando,
            lareiraId: casal.lareira.id,
            tipoUniaoId: casal.tipoUniao.id,
            tipoUniao: casal.tipoUniao,
            casalPadrinhoId: casal.casalPadrinhoId,
            casalPadrinho: casal.casalPadrinho,
            lareira: casal.lareira,
            marido: casal.marido,
            esposa: casal.esposa,
            endereco: casal.endereco,
            filhos: casal.filhos
        });
    }

    get formControls() { return this.editForm.controls; }

    salvar() {
        if (this.editForm.controls.id.value > 0) {
            this.atualizar();
        } else {
            this.inserir();
        }
    }

    atualizar() {
        this.service.update(this.editForm.controls.id.value, this.editForm.value)
            .subscribe(casal => {
                this.casal = casal;
                this.router.navigate(['/casal']);
            }, (error => {
                this.errorHandler.handleError(error);
                this.messageService.add({ severity: 'error', detail: error });
            }));
    }

    inserir() {
        this.service.insert(this.editForm.value)
            .subscribe(casalAdicionado => {
                this.router.navigate(['/casal']);
            }, (error => {
                this.errorHandler.handleError(error);
                this.messageService.add({ severity: 'error', detail: error });
            }));
    }

}
