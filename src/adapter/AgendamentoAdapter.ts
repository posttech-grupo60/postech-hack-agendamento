import Agendamento from "@src/entity/agendamento";

export default class AgendamentoAdapter {
  static create({
    id,
    agendaId,
    medicoId,
    pacienteId,
    dataAgendamento,
    aceito
  }: InputCreate): Agendamento {
    return new Agendamento({ id, agendaId, medicoId, pacienteId, dataAgendamento,aceito });
  }
}

type InputCreate = {
  id?: number;
  agendaId?: number;
  medicoId?: number;
  pacienteId?: number;
  dataAgendamento?: Date;
  aceito?: boolean;
};
