/* eslint-disable prefer-const */
import Usuario from "@src/entity/usuario";
import IUsuarioRepository, {
  InputGetUsuario,
  InputLoginUsuario,
} from "../interfaces/usuario.interface";
import { UsuarioModel } from "./schemas/usuario";
import UsuarioAdapter from "@src/adapter/UsuarioAdapter";
import MedicoAdapter from "@src/adapter/MedicoAdapter";

export default class MongoDbUsuarioRepository implements IUsuarioRepository {
  async login({ login, senha }: InputLoginUsuario): Promise<Usuario> {
    let usuario = await UsuarioModel.findOne({
      $and: [
        {
          $or: [{ email: login }, { crm: login }, { cpf: login }],
        },
        { senha: senha },
      ],
    });
    if (!usuario) throw new Error(`User not found!`);

    return UsuarioAdapter.create({
      id: usuario.id,
      perfil: usuario.perfil,
      email: usuario.email,
      cpf: usuario.cpf,
      crm: usuario.crm,
      senha: usuario.senha,
      cognitoId: usuario.cognitoId,
    });
  }

  async get(input: InputGetUsuario): Promise<Usuario[]> {
    let usuarios = await UsuarioModel.find({
      ...input,
    });

    return usuarios.map((usuario) =>
      MedicoAdapter.create({
        id: usuario.id,
        perfil: usuario.perfil,
        email: usuario.email,
        cpf: usuario.cpf,
        crm: usuario.crm,
        latLong: usuario.latLong,
        valorConsulta: usuario.valorConsulta,
        avaliacao: usuario.avaliacao,
      })
    );
  }

  async getByCodigo(cognitoId?: string): Promise<Usuario> {
    let usuario;

    usuario = await UsuarioModel.findOne({ cognitoId: cognitoId });
    console.log("Passou aqui " + usuario);
    if (!usuario) throw new Error(`User not found!`);

    return UsuarioAdapter.create({
      id: usuario.id,
      perfil: usuario.perfil,
      email: usuario.email,
      cpf: usuario.cpf,
      crm: usuario.crm,
      senha: usuario.senha,
      cognitoId: usuario.cognitoId,
    });
  }
}
