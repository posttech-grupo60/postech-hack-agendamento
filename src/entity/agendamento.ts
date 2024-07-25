export default class Agendamento {
  id?: number;
  agendaId?: number;
  medicoId?: number;
  pacienteId?: number;
  aceito?: boolean;
  dataAgendamento?: Date;

  constructor({ id, agendaId, medicoId, pacienteId, aceito, dataAgendamento}: ContructorAgendamento) {
    this.id = id;
    this.agendaId = agendaId;
    this.medicoId = medicoId;
    this.aceito = aceito;
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
  aceito?: boolean;
};
