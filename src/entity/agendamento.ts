export default class Agendamento {
    id?: number;
    idAgenda?: number;
    agendado?: boolean;
    medicoId?: number;
    pacienteId?: number;
    aceite?: boolean;
  
    constructor({id, agendado, medicoId, pacienteId}: 
        {id?: number; agendado: boolean, medicoId?: number, pacienteId?: number}) {
        this.id = id;
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
    
    setAgendado(agendado: boolean) {
        this.agendado = agendado;
    }
}
  