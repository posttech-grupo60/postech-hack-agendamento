import Agendamento from "@src/entity/agendamento";

export default interface IAgendamentoRepository {
    save(agendamento: Agendamento): Promise<Agendamento>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<Agendamento>;
    answer(id: number, aceite:  boolean): Promise<void>;
}