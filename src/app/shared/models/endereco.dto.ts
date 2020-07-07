import { UF } from './enumerations/uf.model';

export class EnderecoDTO {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: UF;
}
