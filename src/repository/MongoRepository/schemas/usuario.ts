/* c8 ignore start */
import { Schema, model } from "mongoose";

export interface IUsuarioModel {
  id: number;
  perfil: string;
  email: string;
  cpf: string;
  crm: string;
  senha: string;
  cognitoId: string;
}

const usuarioSchema = new Schema<IUsuarioModel>({
    id: { type: Number, unique: true, index: true, default: 0 },
    perfil: { type: String, required: true },
    email: { type: String, required: false },
    cpf: { type: String, required: false },
    crm: { type: String, required: false },
    senha: { type: String, required: true },
    cognitoId: { type: String, required: false },
});

export const UsuarioModel = model<IUsuarioModel>("Usuarios", usuarioSchema);