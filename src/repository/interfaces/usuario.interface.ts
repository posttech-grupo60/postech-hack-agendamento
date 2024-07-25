import Usuario from "@src/entity/usuario";

export default interface IUsuarioRepository {
  get(input: InputGetUsuario): Promise<Usuario[]>;
  login(input: InputLoginUsuario): Promise<Usuario>;
  getByCodigo(cognitoId: string): Promise<Usuario>;
}
export type InputLoginUsuario = {
  login?: string;
  senha?: string;
}

export type InputGetUsuario = {
  perfil?: string;
  id?: string;
};
