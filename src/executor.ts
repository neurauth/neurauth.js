import got from "got";
import { getCredentials } from "./auth"

const NEURAUTH_URL = "http://api.neurauth.com";

enum ActionType {
    insert = "insert",
    get = "get",
    list = "list",
    delete = "delete",
    update = "update"
}

export async function list(entityName: string): Promise<any> {
    const options = buildOptions(entityName, ActionType.list);
    return callApi(options);
}

export async function insert(entityName: string, data: any): Promise<any> {
    const options = buildOptions(entityName, ActionType.insert, data);
    return callApi(options);
}

function buildOptions(entity: string, action: ActionType, data: any = null) {
    const base = {
        url: NEURAUTH_URL + "/api/v1/executor",
        headers: {
            "x-api-key": getCredentials().apiKey
        },
        json: {
            "action": action,
            "entityName": entity,
            "applicationId": getCredentials().appId
        }
    };

    const withData = {
        ...base,
        json: {
          ...base.json,
          data: data}
    }

    return data ? withData : base;
}

function callApi(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                const response = await got.post(options);

                resolve(response.body);
            } catch (error) {
                reject(error);
            }
        })();
    });
}
