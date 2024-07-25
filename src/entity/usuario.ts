interface ContructorUsuario {
  id?: number;
  perfil?: string;
  email?: string;
  cpf?: string;
  crm?: string;
  senha?: string;
  cognitoId?: string;
  latLong?: string;
  valorConsulta?: string;
  avaliacao?: number;
}
export default class Usuario {
  id?: number;
  perfil?: string | null;
  email?: string | null;
  cpf?: string | null;
  crm?: string | null;
  senha?: string | null;
  cognitoId?: string | null;
  latLong?: string | null;
  valorConsulta?: string | null;
  avaliacao?: number | null;

  constructor({
    id,
    perfil,
    email,
    cpf,
    crm,
    senha,
    cognitoId,
    latLong,
    valorConsulta,
    avaliacao,
  }: ContructorUsuario) {
    this.id = id;
    this.perfil = perfil;
    this.email = email;
    this.cpf = cpf;
    this.crm = crm;
    this.senha = senha;
    this.cognitoId = cognitoId;
    this.latLong = latLong;
    this.valorConsulta = valorConsulta;
    this.avaliacao = avaliacao;
  }

  setID = (id: number) => {
    this.id = id;
  };
}
