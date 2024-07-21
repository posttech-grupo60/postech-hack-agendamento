export default class Agenda {
    id?: number;
    data?: Date;
    horarioInicio?: string;
    horarioFim?: string;
    agendado?: boolean;
    medicoId?: number;
    pacienteId?: number
  
    constructor({id, data, horarioInicio, horarioFim, agendado, medicoId, pacienteId}: 
        {id?: number; data: Date; horarioInicio: string, horarioFim: string, agendado: boolean, medicoId?: number | undefined, pacienteId?: number | undefined}) {
        this.id = id;
        this.data = data;
        this.horarioInicio = horarioInicio;
        this.horarioFim  = horarioFim;
        this.agendado = agendado;
        this.medicoId = medicoId;
        this.pacienteId = pacienteId;
    }

    setID(id: number){
        this.id = id;
    }

    setMedicoId(medicoId: number) {
        this.medicoId = medicoId;
    }
}
  