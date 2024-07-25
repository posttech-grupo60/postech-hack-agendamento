import Agendamento from "@src/entity/agendamento";

export default class AgendamentoAdapter {
  static create({
    id,
    agendaId,
    medicoId,
    pacienteId,
    dataAgendamento,
  }: InputCreate): Agendamento {
    return new Agendamento({ id, agendaId, medicoId, pacienteId, dataAgendamento });
  }
}

type InputCreate = {
  id?: number;
  agendaId?: number;
  medicoId?: number;
  pacienteId?: number;
  dataAgendamento?: Date;
};
