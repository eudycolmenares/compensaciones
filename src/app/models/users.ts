export interface RequestLoginModel {
  usuario: string,
  password: string,
  idApp?: string
}

export interface ResponseLoginModel {
  correoAliado: string,
  estado: string,
  fechaExpiracionToken: string,
  nitAliado: string,
  nombreAliado: string,
  token_session: string,
  usuario?: user
}

interface user {
  codPerfil: string,
  descripcion: string,
  entityClass: string,
  estado: string,
  idPerfil: number,
  idUsuario: number
  listRoles: any[],
  nombre: string,
  usuario: string
}
