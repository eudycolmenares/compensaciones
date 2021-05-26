export interface responseSettingsModel {
  GeneralResponse: generalResponse;
}

interface generalResponse {
  code: string;
  descriptionCode: string;
  messageCode: string;
}

export interface requestSettingsModel {
  Setting: settingModel;
}

export interface settingModel {
  id?: string;
  code: string;
  description: string;
  state: number;
  user?: string;
  socialStratums: { socialStratum: {idSocialStatus: number}[] };
  socialStratum?:  string[];
  television?: string;
  internet?: string;
  telephone?: string;
  createDate?: string;
  compensate: string;
}

export interface settingsApiModel {
  GeneralResponse: generalResponse;
  Settings: {
    Setting: settingModel[]
  }
}

export interface SearchResultModel {
  settings: settingModel[];
  total: number;
}
