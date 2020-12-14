export interface responseSettingsModel {
  GeneralResponse: {
    code: string;
    descriptionCode: string;
    messageCode: string;
  }
}

export interface requestSettingsModel {
  Setting: {
    code: string;
    description: string;
    state: string;
    user?: string;
    socialStratum: string;
    television?: string;
    internet?: string;
    telephone?: string;
    createDate?: string;
  }
}
