/* eslint-disable prefer-const */
import Agenda from "@src/entity/agenda";
import IAgendaRepository from "../interfaces/agenda.inteface";
import { AgendaModel } from "./schemas/agenda";

export default class MongoDAgendaRepository implements  IAgendaRepository {
    async save(agendaMedico: Agenda): Promise<Agenda> {
        const agenda = await new AgendaModel(agendaMedico).save();
        agendaMedico.setID(agenda.id);
        return agendaMedico;
    }
    
}