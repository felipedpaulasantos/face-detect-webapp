import { Role } from "./role";

export interface User {
    nome_completo?: string,
    primeiro_nome?: string,
    matricula?: string,
    roles?: Role[]
}
