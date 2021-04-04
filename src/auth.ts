import got from "got";
import { NEURAUTH_URL, getCredentials } from "./setup";

enum ActionType {
    login = "login",
    signin = "signin",
    pulse = "pulse"
}

type Options = {
    login?: string;
    password?: string;
    data?: string;
    token?: string;
}

export async function login(login: string, password: string): Promise<any> {
    const callOptions = buildCallOptions(ActionType.login, { login: login, password: password });
    return callApi(callOptions);
}

function buildCallOptions(action: ActionType, options: Options) {
    const base = {
        url: NEURAUTH_URL + "/api/v1/plasticHeart",
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
