import AuthorizationConfig from "@src/configurations/authorizationConfigurarion";
import IAgendaRepository from "@src/repository/interfaces/agenda.inteface";
import IAgendamentoRepository from "@src/repository/interfaces/agendamento.inteface";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";
import { CopyAndPaste } from "pixjs";

type InputResponderAgendamento = {
  idAgendamento: number;
  aceito: boolean;
  token: string;
};

type OutputResponderAgendamento = {
  valor: number;
  codigoPix: string;
  id: number;
};

export default class ResponderAgendamento {
  constructor(
    readonly agendamentoRepository: IAgendamentoRepository,
    readonly agendaRepository: IAgendaRepository,
    readonly usuarioRepository: IUsuarioRepository
  ) {}

  async execute(input: InputResponderAgendamento): Promise<OutputResponderAgendamento> {
    const cognitoId = await AuthorizationConfig.getUserIdByToken(input.token);
    if (!cognitoId) throw new Error("Id não encontrado");

    const medico = await this.usuarioRepository.getByCodigo(cognitoId);
    if (!medico) throw new Error("Medico não encontrado");
    if (medico?.perfil != "medico")
      throw new Error("Apenas medicos podem responder agendamento.");

    const agendamento = await this.agendamentoRepository.getById(input.idAgendamento);
    if (!agendamento) throw new Error("Agendamento não encontrado");

    const savedAgendamento = await this.agendamentoRepository.save(agendamento);

    return {
      valor: Number(medico.valorConsulta),
      codigoPix: CopyAndPaste({
        name: "Health Check",
        key: "e015b7ed-b6bd-4c5a-bcb3-28f67559d716",
        amount: Number(medico.valorConsulta),
        city: "São Paulo",
        id: "PAGAMENTO",
      }).payload,
      id: savedAgendamento.id ?? 0,
    };
  }
}