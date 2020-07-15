export class UserDTO {
    id: number;
    login: string;
    nome: string;
    email: string;
    descricao: string;
    ativo: boolean;
    token: string;
    perfis: any[];
}
