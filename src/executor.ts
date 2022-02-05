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
    data?: any;
}

type Class<T> = new (...args: any[]) => T;

function getEntityName<T>(schema: Class<T> | string): string {
    let entityName = "";
    if (typeof schema == "string") {
        entityName = schema as string;
    } else {
        schema = schema as Class<T>
        entityName = schema.name.toLowerCase();
    }
    return entityName;
}

export async function list<T>(schema: Class<T> | string): Promise<T[]> {
    const callOptions = buildCallOptions(ActionType.list, { entityName: getEntityName(schema) });
    return await callApi(callOptions);
}

export async function get<T>(schema: Class<T> | string, entityId: string): Promise<T> {
    const callOptions = buildCallOptions(ActionType.get, { entityName: getEntityName(schema), entityId: entityId });
    return callApi(callOptions);
}

export async function insert<T>(schema: Class<T> | string, data: any): Promise<T> {
    const callOptions = buildCallOptions(ActionType.insert, { entityName: getEntityName(schema), data: data });
    return callApi(callOptions);
}

export async function update<T>(schema: Class<T> | string, entityId: string, data: any): Promise<T> {
    const callOptions = buildCallOptions(ActionType.update, { entityName: getEntityName(schema), entityId: entityId, data: data });
    return callApi(callOptions);
}

export async function remove<T>(schema: Class<T> | string, entityId: string): Promise<T> {
    const callOptinos = buildCallOptions(ActionType.delete, { entityName: getEntityName(schema), entityId: entityId });
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
