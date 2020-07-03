import { LareiraDTO } from './../../../shared/models/lareira.dto';
import { Component, OnInit } from '@angular/core';
import { LareiraService } from '../lareira.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-lareira-cadastro',
    templateUrl: './lareira-cadastro.component.html',
    styleUrls: ['./lareira-cadastro.component.css']
})
export class LareiraCadastroComponent implements OnInit {
    lareira: LareiraDTO;
    headerPage = '';

    lareiraForm: FormGroup;

    constructor(
        private service: LareiraService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.lareiraForm = this.fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(5)]],
            endereco: [''],
            bairro: ['', Validators.required],
            cep: [''],
            cidade: [''],
            estado: [''],
            telefone: ['']
        });

        const idLareira = +this.route.snapshot.paramMap.get('id');

        this.headerPage = 'Nova Lareira';

        // Protege caso não seja retornado o código
        if (idLareira) {
            this.headerPage = 'Alterar Lareira';
            this.service.find(idLareira).subscribe(lareira => this.lareiraForm.patchValue(lareira));
        } else {
            this.lareira = new LareiraDTO();
        }
    }

    get formControls() { return this.lareiraForm.controls; }

    salvar(form: FormControl) {
        if (this.lareiraForm.controls.id.value > 0) {
            this.atualizarLareira();
        } else {
            this.inserirLareira();
        }
    }

    atualizarLareira() {
        this.service.update(this.lareiraForm.controls.id.value, this.lareiraForm.value)
            .subscribe(lareira => {
                this.lareira = lareira;

                // this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
                // this.atualizarTituloEdicao();
                this.router.navigate(['/lareira']);
            });
        // .catch(erro => this.errorHandler.handle(erro));
    }

    inserirLareira() {
        this.service.insert(this.lareiraForm.value)
            .subscribe(lareiraAdicionada => {
                // this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
                this.router.navigate(['/lareira']);
            });
        // .catch(erro => this.errorHandler.handle(erro));
    }

}
