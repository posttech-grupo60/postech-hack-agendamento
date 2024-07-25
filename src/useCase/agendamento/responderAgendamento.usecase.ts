import AuthorizationConfig from "@src/configurations/authorizationConfigurarion";
import IAgendaRepository from "@src/repository/interfaces/agenda.inteface";
import IAgendamentoRepository from "@src/repository/interfaces/agendamento.inteface";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";

type InputResponderAgendamento = {
  idAgendamento: number;
  aceito: boolean;
  token: string;
};

export default class ResponderAgendamento {
  constructor(
    readonly agendamentoRepository: IAgendamentoRepository,
    readonly agendaRepository: IAgendaRepository,
    readonly usuarioRepository: IUsuarioRepository
  ) {}

  async execute(input: InputResponderAgendamento): Promise<boolean> {
    const cognitoId = await AuthorizationConfig.getUserIdByToken(input.token);
    if (!cognitoId) throw new Error("Id não encontrado");

    const medico = await this.usuarioRepository.getByCodigo(cognitoId);
    if (!medico) throw new Error("Medico não encontrado");
    if (medico?.perfil != "medico")
      throw new Error("Apenas medicos podem responder agendamento.");

    const agendamento = await this.agendamentoRepository.getById(input.idAgendamento);
    console.log("🚀 ~ ResponderAgendamento ~ execute ~ agendamento:", agendamento)
    if (!agendamento?.id) throw new Error("Agendamento não encontrado");

    await this.agendamentoRepository.answer(agendamento.id, input.aceito);
    return true
  }
}