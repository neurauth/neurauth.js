import got from "got";
import { UnauthorizedAccessError } from "./errors/UnauthorizedAccessError";
import { NEURAUTH_URL, getCredentials } from "./setup";

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
    return await callApi(callOptions);
}

export async function get(entityName: string, entityId: string): Promise<any> {
    const callOptions = buildCallOptions(ActionType.get, { entityName: entityName, entityId: entityId });
    return callApi(callOptions);
}

export async function insert(entityName: string, data: any): Promise<any> {
    const callOptions = buildCallOptions(ActionType.insert, { entityName: entityName, data: data });
    return callApi(callOptions);
}

export async function update(entityName: string, entityId: string, data: any): Promise<any> {
    const callOptions = buildCallOptions(ActionType.update, { entityName: entityName, entityId: entityId, data: data });
    return callApi(callOptions);
}

export async function remove(entityName: string, entityId: string): Promise<any> {
    const callOptinos = buildCallOptions(ActionType.delete, { entityName: entityName, entityId: entityId });
    return callApi(callOptinos);
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
            "options": options
        }
    };

    return base;
}

async function callApi(options: any) {
    try {
        const response = await got.post(options);

        return JSON.parse(response.body);
    } catch (error: any) {
        let body = JSON.parse(error.response.body);
        throw new UnauthorizedAccessError(body.message);
    }
}
