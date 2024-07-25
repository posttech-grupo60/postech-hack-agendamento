/* eslint-disable prefer-const */
import Agenda from "@src/entity/agenda";
import IAgendaRepository from "../interfaces/agenda.inteface";
import { AgendaModel } from "./schemas/agenda";

export default class MongoDAgendaRepository implements IAgendaRepository {
  async get({ id }: { id?: string }): Promise<Agenda[]> {
    let agendas = await AgendaModel.find({
      id,
    });

    return agendas.map(
      (agenda) =>
        new Agenda({
          id: agenda.id,
          data: agenda.data,
          horarioInicio: agenda.horarioInicio,
          horarioFim: agenda.horarioFim,
          agendado: agenda.agendado,
          medicoId: agenda.medicoId,
        })
    );
  }

  async save(agendaMedico: Agenda): Promise<Agenda> {
    const agenda = await new AgendaModel(agendaMedico).save();
    agendaMedico.setID(agenda.id);
    return agendaMedico;
  }
}
