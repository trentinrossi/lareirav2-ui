import { LareiraDTO } from './../../shared/models/lareira.dto';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/interceptors/error.interceptor';

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

    find(id: number): Observable<LareiraDTO> {
        return this.http.get<LareiraDTO>(`${this.lareiraUrl}/${id}`);
    }

    insert(lareira: LareiraDTO): Observable<LareiraDTO> {
        return this.http.post<LareiraDTO>(`${this.lareiraUrl}`, lareira);
    }

    update(id: number, lareira: LareiraDTO): Observable<LareiraDTO> {
        return this.http.put<LareiraDTO>(`${this.lareiraUrl}/${id}`, lareira);
    }

    delete(id: number): Observable<LareiraDTO> {
        return this.http.delete<LareiraDTO>(`${this.lareiraUrl}/${id}`);
    }

}
