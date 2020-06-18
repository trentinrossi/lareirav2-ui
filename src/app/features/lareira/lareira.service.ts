import { LareiraDTO } from './../../shared/models/lareira.dto';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/interceptors/error-interceptor';

@Injectable({
    providedIn: 'root'
})
export class LareiraService {

    lareiraUrl: string;

    constructor(public http: HttpClient, public handleError: ErrorHandlerService) {
        this.lareiraUrl = `${environment.api.baseUrl}/lareiras`;
    }

    findAll(): Observable<LareiraDTO> {
        return this.http.get<LareiraDTO>(`${this.lareiraUrl}`);
    }
}
