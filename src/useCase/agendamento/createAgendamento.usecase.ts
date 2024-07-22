import AuthorizationConfig from "@src/configurations/authorizationConfigurarion";
import Agenda from "@src/entity/agenda";
import IAgendaRepository from "@src/repository/interfaces/agenda.inteface";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";

type InputCreateAgendamento = {
  idAgenda: string;
  token: string;
}

export default class CreateAgendamento {
    token: string | undefined;
    constructor(
        readonly agendaRepository: IAgendaRepository,
        readonly usuarioRepository: IUsuarioRepository
    ) {}
  
    async execute(input: InputCreateAgendamento): Promise<Agenda> {
      
      const cognitoId = await AuthorizationConfig.getUserIdByToken(input.token);
      if (!cognitoId)
        throw new Error("Id não encontrado");

      const usuario = await this.usuarioRepository.getByCodigo(cognitoId);

      if (usuario?.perfil != "paciente")
        throw new Error("Apenas pacientes podem realizar agendamentos.");

      const agenda = await this.agendaRepository.get({id: input.idAgenda});
      if(!agenda) throw new Error("Agenda não encontrada");
      
      const agendaSave = await this.agendaRepository.save(agenda);
      
      return agendaSave;
    }
  }
  