import Usuario from "@src/entity/usuario";

export default interface IUsuarioRepository {
    get(input: InputGet): Promise<Usuario>;
    getByCodigo(cognitoId: string): Promise<Usuario>;
  }
  
  type InputGet = {
    login?: string;
    senha?: string;
  };