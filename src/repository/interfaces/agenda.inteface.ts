import Agenda from "@src/entity/agenda";

export default interface IAgendaRepository {
    save(agenda: Agenda): Promise<Agenda>;
}
  
  