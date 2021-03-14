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

type Options = {
    entityName: string;
    entityId?: string;
    data?: string;
}

export async function list(entityName: string): Promise<any> {
    const callOptions = buildCallOptions(ActionType.list, { entityName: entityName });
    return callApi(callOptions);
}

export async function insert(entityName: string, data: any): Promise<any> {
    const callOptions = buildCallOptions(ActionType.insert, { entityName: entityName, data: data });
    return callApi(callOptions);
}

function buildCallOptions(action: ActionType, options: Options) {
    const base = {
        url: NEURAUTH_URL + "/api/v1/executor",
        headers: {
            "x-api-key": getCredentials().apiKey
        },
        json: {
            "action": action,
            "applicationId": getCredentials().appId,
            "options": {
                "entityName": options.entityName
            }
        }
    };

    const withData = {
        ...base,
        json: {
            ...base.json,
            options: {
                ...base.json.options,
                data: options.data
            }
        }
    }

    return options.data ? withData : base;
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
