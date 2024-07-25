import AuthorizationConfig from "@src/configurations/authorizationConfigurarion";
import Agendamento from "@src/entity/agendamento";
import IAgendaRepository from "@src/repository/interfaces/agenda.inteface";
import IAgendamentoRepository from "@src/repository/interfaces/agendamento.inteface";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";
import { CopyAndPaste } from "pixjs";

type InputCreateAgendamento = {
  idAgenda: number;
  idMedico: string;
  token: string;
};

type OutputCreateAgendamento = {
  valor: number;
  codigoPix: string;
  id: number;
};

export default class CreateAgendamento {
  constructor(
    readonly agendamentoRepository: IAgendamentoRepository,
    readonly agendaRepository: IAgendaRepository,
    readonly usuarioRepository: IUsuarioRepository
  ) {}

  async execute(input: InputCreateAgendamento): Promise<OutputCreateAgendamento> {
    const cognitoId = await AuthorizationConfig.getUserIdByToken(input.token);
    if (!cognitoId) throw new Error("Id não encontrado");

    const usuario = await this.usuarioRepository.getByCodigo(cognitoId);
    if (usuario?.perfil != "paciente")
      throw new Error("Apenas pacientes podem realizar agendamentos.");

    const [medico] = await this.usuarioRepository.get({
      id: input.idMedico,
      perfil: "medico",
    });
    if (!medico) throw new Error("Medico não encontrado");

    const [agenda] = await this.agendaRepository.get({ id: input.idMedico });
    if (!agenda) throw new Error("Agenda não encontrado");

    if (!agenda.id || medico.id || usuario.id)
      throw new Error("Erro ao criar agendamento");
    const agendamento = new Agendamento({
      agendaId: agenda.id,
      medicoId: medico.id,
      pacienteId: usuario.id,
    });

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