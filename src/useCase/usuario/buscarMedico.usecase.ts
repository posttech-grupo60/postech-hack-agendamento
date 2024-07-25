import Usuario from "@src/entity/usuario";
import IUsuarioRepository from "@src/repository/interfaces/usuario.interface";
import { getDistanceFromLatLonInKm } from "@src/utils/latLong";

export default class BuscarMedico {
  token: string | undefined;
  constructor(readonly usuarioRepository: IUsuarioRepository) {}

  async execute(input: Input): Promise<Usuario[]> {
    if (input.distancia && !input.latLong) throw new Error("LATLONG_NOT_FOUND");
    const filterObject : Partial<Input> = {};
    if(input.especialidade) filterObject["especialidade"] = input.especialidade;
    if(input.avaliacao) filterObject["avaliacao"] = input.avaliacao;
    let usuarios = await this.usuarioRepository.get({perfil: "medico", ...filterObject});
    if(input.distancia && input.latLong) {
      const [userLat, userLong] = input.latLong.split(",").map(item => parseFloat(item));
      usuarios = usuarios.filter(medico => {
        if(!medico.latLong) return false;
        const [medicoLat, medicoLong] = medico.latLong.split(",").map(item => parseFloat(item));
        const distance = getDistanceFromLatLonInKm(userLat, userLong, medicoLat,medicoLong);
        if(input.distancia && distance > input.distancia) return false;
        return true;
      });
    }
    return usuarios;
  }
}

type Input = {
  especialidade?: string;
  distancia?: number;
  avaliacao?: number;
  latLong?: string;
};
