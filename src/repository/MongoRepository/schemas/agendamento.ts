import { Schema, model } from "mongoose";

export interface IAgendamentoModel {
  id: number;
  agendaId: number;
  medicoId: number;
  pacienteId: number;
  aceito?: boolean;
  dataAgendamento: Date;
}

const agendamentoSchema = new Schema<IAgendamentoModel>({
    id: { type: Number, unique: true, index: true, default: 0 },
    agendaId: { type: Number, required: false },
    medicoId: { type: Number, required: true },
    pacienteId: { type: Number, required: true },
    aceito: { type: Boolean, required: false, default: false },
    dataAgendamento: { type: Date, required: true }
});

agendamentoSchema.pre("save", async function (next) {
    const maxId = await AgendamentoModel.findOne().sort({ id: -1 }).limit(1);
    const nextId = maxId ? maxId.id + 1 : 1;
    this.id = nextId;
    next();
  });

export const AgendamentoModel = model<IAgendamentoModel>("Agendamentos", agendamentoSchema);