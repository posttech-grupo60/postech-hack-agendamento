export default class Agenda {
  id?: number;
  data?: Date;
  horarioInicio?: string;
  horarioFim?: string;
  agendado?: boolean;
  medicoId?: number;
  agendamentoId?: number;

  constructor({
    id,
    data,
    horarioInicio,
    horarioFim,
    medicoId,
  }: ContructorAgenda) {
    this.id = id;
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioFim = horarioFim;
    this.medicoId = medicoId;
  }

  setID(id: number) {
    this.id = id;
  }

  setMedicoId(medicoId: number) {
    this.medicoId = medicoId;
  }

  setAgendamentoId(agendamentoId: number) {
    this.agendamentoId = agendamentoId;
  }
}

type ContructorAgenda = {
  id?: number;
  data: Date;
  horarioInicio: string;
  horarioFim: string;
  medicoId?: number;
};
