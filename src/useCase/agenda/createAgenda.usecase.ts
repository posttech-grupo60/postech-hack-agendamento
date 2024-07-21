import AuthorizationConfig from "@src/configurations/authorizationConfigurarion";
import Agenda from "@src/entity/agenda";
import IAgendaRepository from "@src/repository/interfaces/agenda.inteface";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";

export default class CreateAgenda {
    token: string | undefined;
    constructor(readonly agendaRepository: IAgendaRepository,
        readonly usuarioRepository: IUsuarioRepository
    ) {}
  
    async execute(agenda: Agenda, token: string): Promise<Agenda> {
      
      const cognitoId = await AuthorizationConfig.getUserIdByToken(token);
      if (!cognitoId)
        throw new Error("Id nao encontrado");

      const usuario = await this.usuarioRepository.getByCodigo(cognitoId);

      if (usuario?.perfil != "medico")
        throw new Error("Voce não pode cadastrar uma agenda se não for médico");

      if (usuario.id !== undefined)
        agenda.setMedicoId(usuario.id);

      const agendaSave = await this.agendaRepository.save(agenda);
      
      return agendaSave;
    }
  }
  