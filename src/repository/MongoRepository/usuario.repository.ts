/* eslint-disable prefer-const */
import Usuario from "@src/entity/usuario";
import IUsuarioRepository from "../interfaces/usuario.interface";
import { UsuarioModel } from "./schemas/usuario";
import UsuarioAdapter from "@src/adapter/UsuarioAdapter";

export default class MongoDbUsuarioRepository implements  IUsuarioRepository {
    async get({ login, senha }: { login?: string; senha?: string }): Promise<Usuario> {
        let usuario;

        console.log('Mongo db' + login + " " + senha);
        usuario = await UsuarioModel.findOne({
            $and: [
                {
                    $or: [
                        { email: login },
                        { crm: login },
                        { cpf: login },
                        
                    ]
                },
                    { senha: senha },
            ]
            });
        if (!usuario) throw new Error(`User not found!`);

        return UsuarioAdapter.create({
            id: usuario.id,
            perfil: usuario.perfil,
            email: usuario.email,
            cpf: usuario.cpf,
            crm: usuario.crm,
            senha: usuario.senha,
            cognitoId: usuario.cognitoId
        });
    }

    async getByCodigo(cognitoId?: string ): Promise<Usuario> {
        let usuario;

        usuario = await UsuarioModel.findOne({cognitoId : cognitoId});
        console.log("Passou aqui " + usuario);
        if (!usuario) throw new Error(`User not found!`);

        return UsuarioAdapter.create({
            id: usuario.id,
            perfil: usuario.perfil,
            email: usuario.email,
            cpf: usuario.cpf,
            crm: usuario.crm,
            senha: usuario.senha,
            cognitoId: usuario.cognitoId
        });
    }
}