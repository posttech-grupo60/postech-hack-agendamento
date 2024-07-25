import Agenda from "@src/entity/agenda";

export default interface IAgendaRepository {
    save(agenda: Agenda): Promise<Agenda>;
    get(input: GetInput): Promise<Agenda[]>;
}
  
type GetInput = {
    id?: string
}
  