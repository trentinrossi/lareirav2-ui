import { LareiraService } from './../lareira.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-lareira-pesquisa',
    templateUrl: './lareira-pesquisa.component.html',
    styleUrls: ['./lareira-pesquisa.component.css']
})
export class LareiraPesquisaComponent implements OnInit {

    constructor(
        private service: LareiraService
    ) { }

    ngOnInit(): void {
        this.service.findAll()
            .subscribe(resp => {
                console.log(resp);
            });
    }

}
