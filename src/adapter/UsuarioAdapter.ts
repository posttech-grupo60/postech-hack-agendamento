import Usuario from "@src/entity/usuario";

export default class UsuarioAdapter {
    static create({ id, perfil, email, cpf, crm, senha, cognitoId }: InputCreate): Usuario {
      return new Usuario({id, perfil, email, cpf, crm, senha, cognitoId});
    }
  }
  
  type InputCreate = {
    id?: number;
    perfil: string;
    email: string;
    cpf: string;
    crm: string;
    senha: string;
    cognitoId:  string;
  };