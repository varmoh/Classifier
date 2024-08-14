export type DataModel = {
    modelId: number;
    modelName: string;
    dgName?: string;
    dgId: string |number;
    platform: string;
    baseModels: string[];
    maturity: string;
    version?: string;
  };

export type TrainingProgressData = {
  id: string;
  modelName: string;
  majorVersion: number;
  minorVersion: number;
  latest: boolean;
  trainingStatus: string;
  progressPercentage: number;
};

export type SSEEventData = {
  sessionId: string;
  trainingStatus: string;
  progressPercentage: number;
};

export type UpdatedDataModelPayload = {
  modelId: number;
    connectedDgId: string | null | undefined;
    deploymentEnv: string | null | undefined;
    baseModels: string | null | undefined;
    maturityLabel: string | null | undefined;
    updateType: string | undefined;
};

export type CreateDataModelPayload={
  modelName: string | undefined;
    dgId: string | number | undefined;
    baseModels: string[] | undefined;
    deploymentPlatform: string | undefined;
    maturityLabel: string | undefined;
}

export type FilterData = {
  modelNames: string[];
  modelVersions: string[];
  deploymentsEnvs: string[];
  datasetGroups: Array<{ id: number; name: string }>;
  trainingStatuses: string[];
  maturityLabels: string[];
};

export type DataModelResponse = {
  id: number;
  modelName: string;
  connectedDgName: string;
  majorVersion: number;
  minorVersion: number;
  latest: boolean;
  dgVersion: string;
  lastTrained: string;
  trainingStatus: string;
  deploymentEnv: string;
  maturityLabel: string;
  trainingResults: string[];
};

export type Filters = {
  modelName: string;
  version: string;
  platform: string;
  datasetGroup: number;
  trainingStatus: string;
  maturity: string;
  sort: 'asc' | 'desc';
};
