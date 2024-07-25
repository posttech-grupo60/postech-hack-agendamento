export default class Agendamento {
  id?: number;
  agendaId?: number;
  medicoId?: number;
  pacienteId?: number;
  aceito?: boolean;
  dataAgendamento?: Date;

  constructor({ id, agendaId, medicoId, pacienteId, dataAgendamento}: ContructorAgendamento) {
    this.id = id;
    this.agendaId = agendaId;
    this.medicoId = medicoId;
    this.pacienteId = pacienteId;
    this.dataAgendamento = dataAgendamento ??  new Date();
  }

  setID(id: number) {
    this.id = id;
  }

  setMedicoId(medicoId: number) {
    this.medicoId = medicoId;
  }
}

type ContructorAgendamento = {
  id?: number;
  agendaId?: number;
  medicoId?: number;
  pacienteId?: number;
  dataAgendamento?: Date;
};
