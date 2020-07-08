import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TipoUniaoDTO } from 'src/app/shared/models/tipo-uniao.dto';

@Injectable({
    providedIn: 'root'
})
export class TipoUniaoService {

    tipoUniaoUrl: string;

    constructor(public http: HttpClient) {
        this.tipoUniaoUrl = `${environment.api.baseUrl}/tipos-uniao`;
    }

    findAll(): Observable<any> {
        return this.http.get<any>(`${this.tipoUniaoUrl}`);
    }

    find(id: number): Observable<TipoUniaoDTO> {
        return this.http.get<TipoUniaoDTO>(`${this.tipoUniaoUrl}/${id}`);
    }

    insert(tipoUniao: TipoUniaoDTO): Observable<TipoUniaoDTO> {
        return this.http.post<TipoUniaoDTO>(`${this.tipoUniaoUrl}`, tipoUniao);
    }

    update(id: number, tipoUniao: TipoUniaoDTO): Observable<TipoUniaoDTO> {
        return this.http.put<TipoUniaoDTO>(`${this.tipoUniaoUrl}/${id}`, tipoUniao);
    }

    delete(id: number): Observable<TipoUniaoDTO> {
        return this.http.delete<TipoUniaoDTO>(`${this.tipoUniaoUrl}/${id}`);
    }
}
