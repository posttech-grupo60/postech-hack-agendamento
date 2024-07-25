/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Agenda from '@src/entity/agenda';
import MongoDAgendaRepository from '@src/repository/MongoRepository/agenda.repository';
import MongoDbUsuarioRepository from '@src/repository/MongoRepository/usuario.repository';
import CreateAgenda from '@src/useCase/agenda/createAgenda.usecase';
import {Router} from 'express';

const router = Router();

router.post('/criar-agenda', async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).json({message: 'Usuario não autenticado', status: 401});

        const agenda = new Agenda({
            data: new Date(req.body.data),
            horarioInicio: req.body.horarioInicio,
            horarioFim: req.body.horarioFim,
            medicoId: undefined
        });

        const agendaRepository = new MongoDAgendaRepository();
        const usuarioRepository = new MongoDbUsuarioRepository();
        const validateUsuario = new CreateAgenda(agendaRepository, usuarioRepository);

        const usuario = await validateUsuario.execute(agenda, token);
        return res.status(200).json({data: usuario, status: 200});
    } catch (error: any) {
        if(error.message === 'Usuario not found'){
            return res.status(404).json({message: 'Usuario não encontrado', status: 404});
        }

        console.log(error.message);
        return res.status(500).json({message: 'Erro! Contate a administração.', status: 500});
    }
});

export default router;