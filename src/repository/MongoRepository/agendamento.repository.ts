/* eslint-disable prefer-const */
import IAgendamentoRepository from "../interfaces/agendamento.inteface";
import Agendamento from "@src/entity/agendamento";
import { AgendamentoModel } from "./schemas/agendamento";

export default class MongoDBAgendamentoRepository implements  IAgendamentoRepository {
    async answer(id: number, aceito: boolean): Promise<void> {
      await AgendamentoModel.updateOne({ id }, {
        aceito
      })
    }

    async getById(id: number): Promise<Agendamento> {
        const agendamentoBanco = await AgendamentoModel.findOne({ id });
        return new Agendamento({...agendamentoBanco});
    }

    async save(agendamento: Agendamento): Promise<Agendamento> {
        const agendamentoBanco = await new AgendamentoModel(agendamento).save();
        agendamento.setID(agendamentoBanco.id);
        return agendamento;
    }

    async delete(id: number): Promise<void> {
        await AgendamentoModel.deleteOne({ id });
    }
}