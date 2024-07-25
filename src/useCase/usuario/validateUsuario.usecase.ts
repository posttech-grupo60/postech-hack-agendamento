import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";
import AwsService from "@src/services/awsService";

export default class ValidateUsuario {
    token: string | undefined;
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
  
    async execute(input: Input): Promise<string|undefined> {
      const { login, senha } = input;
      const service = new AwsService();

      const usuario = await this.usuarioRepository.login({ login, senha });
      if (usuario)
        this.token =  await service.authenticate(login, senha);
      if (!usuario) throw new Error("USUARIO_NOT_FOUND");
      
      return this.token?.toString();
    }
  }
  
  type Input = {
    login?: string;
    senha?: string;
  };
  