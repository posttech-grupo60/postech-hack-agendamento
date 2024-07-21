/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MongoDbUsuarioRepository from '@src/repository/MongoRepository/usuario.repository';
import ValidateUsuario from '@src/useCase/usuario/validateUsuario.usecase';
import {Router} from 'express';

const router = Router();

router.post('/validar', async (req, res) => {
    try {
        const {login, senha} =  req.body;
        const usuarioRepository = new MongoDbUsuarioRepository();
        const validateUsuario = new ValidateUsuario(usuarioRepository);
        const usuario = await validateUsuario.execute({login, senha});
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