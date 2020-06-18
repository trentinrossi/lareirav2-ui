import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerService {

    constructor(
        private messageService: MessageService
    ) { }

    handle(error: HttpErrorResponse) {
        let msg: string;

        // else if (errorResponse instanceof NotAuthenticatedError) {
        //     msg = 'Sua sessão expirou!';
        //     this.router.navigate(['/login']);

        // }
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else if (error.status >= 400 && error.status <= 499) {
            msg = 'Ocorreu um erro ao processar a sua solicitação';

            if (error.status === 403) {
                msg = 'Você não tem permissão para executar esta ação';
            }

            try {
                msg = error.error[0].mensagemUsuario;
            } catch (e) { }

            console.error('Ocorreu um erro', error);

        } else {
            msg = 'Erro ao processar serviço remoto. Tente novamente.';
            console.error('Ocorreu um erro', error);
        }

        this.messageService.add({ severity: 'error', detail: msg });

        return throwError('Something is wrong');
    }

}
