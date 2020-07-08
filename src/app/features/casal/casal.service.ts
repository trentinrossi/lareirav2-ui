import { CasalDTO } from './../../shared/models/casal.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CasalService {

    casalUrl: string;

    constructor(public http: HttpClient) {
        this.casalUrl = `${environment.api.baseUrl}/casais`;
    }

    findAll(page: number, linesPerPage: number, orderBy: string, direction: string): Observable<any> {
        return this.http.get<any>(`${this.casalUrl}?page=${page}&linesPerPage=${linesPerPage}`);
    }

    find(id: number): Observable<CasalDTO> {
        return this.http.get<CasalDTO>(`${this.casalUrl}/${id}`);
    }

    insert(casal: CasalDTO): Observable<CasalDTO> {
        return this.http.post<CasalDTO>(`${this.casalUrl}`, casal);
    }

    update(id: number, casal: CasalDTO): Observable<CasalDTO> {
        return this.http.put<CasalDTO>(`${this.casalUrl}/${id}`, casal);
    }

    delete(id: number): Observable<CasalDTO> {
        return this.http.delete<CasalDTO>(`${this.casalUrl}/${id}`);
    }

    // uploadFoto(file: ): Observable<CasalDTO> {
    //     return
    // }
}
