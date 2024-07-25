import Usuario from "@src/entity/usuario";

export default class MedicoAdapter {
    static create({ id, perfil, email, cpf, crm, latLong, valorConsulta, avaliacao }: InputCreate): Usuario {
      return new Usuario({id, perfil, email, cpf, crm, latLong, valorConsulta, avaliacao});
    }
  }
  
  type InputCreate = {
    id?: number;
    perfil: string;
    email: string;
    cpf: string;
    crm: string;
    latLong: string;
    valorConsulta: string;
    avaliacao: number;
  };