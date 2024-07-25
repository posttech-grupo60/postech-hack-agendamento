/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MongoDBAgendaRepository from "@src/repository/MongoRepository/agenda.repository";
import MongoDbUsuarioRepository from "@src/repository/MongoRepository/usuario.repository";
import MongoDBAgendamentoRepository from "@src/repository/MongoRepository/agendamento.repository";
import CreateAgendamento from "@src/useCase/agendamento/createAgendamento.usecase";
import CancelaAgendamento from "@src/useCase/agendamento/cancelaAgendamento.usecase";
import ResponderAgendamento from "@src/useCase/agendamento/responderAgendamento.usecase";
import { Router } from "express";

const router = Router();

router.post("/criar-agendamento", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(401)
        .json({ message: "Usuario não autenticado", status: 401 });

    const { idAgenda, idMedico } = req.body;

    const agendaRepository = new MongoDBAgendaRepository();
    const usuarioRepository = new MongoDbUsuarioRepository();
    const agendamentoRepository = new MongoDBAgendamentoRepository();
    const createAgendamento = new CreateAgendamento(
      agendamentoRepository,
      agendaRepository,
      usuarioRepository
    );

    const dadosPagamento = await createAgendamento.execute({
      idAgenda,
      idMedico,
      token,
    });

    return res.status(201).json({ data: dadosPagamento, status: 201 });
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Erro! Contate a administração.", status: 500 });
  }
});

router.post("/cancela-agendamento", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(401)
        .json({ message: "Usuario não autenticado", status: 401 });

    const { idAgendamento } = req.body;

    const agendaRepository = new MongoDBAgendaRepository();
    const usuarioRepository = new MongoDbUsuarioRepository();
    const agendamentoRepository = new MongoDBAgendamentoRepository();
    const deleteAgendamento = new CancelaAgendamento(
      agendamentoRepository,
      agendaRepository,
      usuarioRepository
    );

    await deleteAgendamento.execute({
      token,
      idAgendamento
    });

    return res.status(201).json({ status: 201 });
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Erro! Contate a administração.", status: 500 });
  }
});

router.post("/responder-agendamento", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(401)
        .json({ message: "Usuario não autenticado", status: 401 });

    const { idAgendamento, aceito } = req.body;

    const agendaRepository = new MongoDBAgendaRepository();
    const usuarioRepository = new MongoDbUsuarioRepository();
    const agendamentoRepository = new MongoDBAgendamentoRepository();
    const responderAgendamento = new ResponderAgendamento(
      agendamentoRepository,
      agendaRepository,
      usuarioRepository
    );

    await responderAgendamento.execute({
      token,
      idAgendamento,
      aceito
    });

    return res.status(201).json({ status: 201 });
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Erro! Contate a administração.", status: 500 });
  }
});

export default router;
