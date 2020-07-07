import { FilhoDTO } from './filho.dto';
import { PessoaFisicaDTO } from './pessoa-fisica.dto';
import { EnderecoDTO } from './endereco.dto';

export class CasalDTO {
    id: number;
    numeroFicha: number;
    foneFixo: string;
    dataUniao: Date;
    memorando: string;
    lareiraId: number;
    tipoUniaoId: number;
    casalPadrinhoId: number;
    marido: PessoaFisicaDTO;
    esposa: PessoaFisicaDTO;
    endereco: EnderecoDTO;
    filhos: FilhoDTO[];
}
