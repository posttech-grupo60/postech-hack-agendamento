import { Schema, model } from "mongoose";

export interface IAgendaModel {
  id: number;
  data: Date;
  horarioInicio: string;
  horarioFim: string;
  agendado: boolean;
  medicoId: number;
  pacienteId: number;
}

const agendaSchema = new Schema<IAgendaModel>({
    id: { type: Number, unique: true, index: true, default: 0 },
    data: { type: Date, required: true },
    horarioInicio: { type: String, required: true },
    horarioFim: { type: String, required: true },
    agendado: { type: Boolean, required: false, default: false },
    medicoId: { type: Number, required: true },
    pacienteId: { type: Number, required: false },
});

agendaSchema.pre("save", async function (next) {
    const maxId = await AgendaModel.findOne().sort({ id: -1 }).limit(1);
    const nextId = maxId ? maxId.id + 1 : 1;
    this.id = nextId;
    next();
  });

export const AgendaModel = model<IAgendaModel>("Agendas", agendaSchema);