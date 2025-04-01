// Auto-generated from liveupdate_tester by vite-plugin-designer-python-loader
import { AxiosResponse } from 'axios';
import { PythonApiClient, ExecuteResponse, RegisterResponse } from '@disguise-one/designer-pythonapi';

export type autocompleteFunction = (objExpr: any, propPath: any) => Promise<ExecuteResponse>;

export declare const liveupdate_tester: (directorEndpoint: string) => {
  client: PythonApiClient,
  registration: Promise<AxiosResponse<RegisterResponse>>,
  autocomplete: autocompleteFunction
};
