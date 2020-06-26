import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(
        private messageService: MessageService
    ) { }

    handleError(error: any): void {
        let msg: string;

        console.error(error);

        if (typeof error === 'string') {
            msg = error;

        } else if (error instanceof HttpErrorResponse && error.status >= 400 && error.status <= 499) {
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
            console.error('Ocorreu um erro', msg);
        }

        this.messageService.add({ severity: 'error', detail: msg });
    }
}
