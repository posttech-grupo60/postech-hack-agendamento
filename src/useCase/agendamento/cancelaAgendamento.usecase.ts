import AuthorizationConfig from "@src/configurations/authorizationConfigurarion";
import IAgendaRepository from "@src/repository/interfaces/agenda.inteface";
import IAgendamentoRepository from "@src/repository/interfaces/agendamento.inteface";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";

type InputCancelaAgendamento = {
  idAgendamento: number;
  token: string;
};

export default class CancelaAgendamento {
  constructor(
    readonly agendamentoRepository: IAgendamentoRepository,
    readonly agendaRepository: IAgendaRepository,
    readonly usuarioRepository: IUsuarioRepository
  ) {}

  async execute(input: InputCancelaAgendamento): Promise<boolean> {
    const cognitoId = await AuthorizationConfig.getUserIdByToken(input.token);
    if (!cognitoId) throw new Error("Id não encontrado");

    const usuario = await this.usuarioRepository.getByCodigo(cognitoId);
    if (usuario?.perfil != "paciente")
      throw new Error("Apenas pacientes podem cancelar agendamentos.");

    await this.agendamentoRepository.delete(input.idAgendamento);
    return true;
  }
}