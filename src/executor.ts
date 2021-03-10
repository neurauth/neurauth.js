import got from "got";
import { getCredentials } from "./auth"

const NEURAUTH_URL = "https://neurauth-api.herokuapp.com";

export async function list(entityName: string, data: any): Promise<any> {
    const options = {
        url: NEURAUTH_URL + "/api/v1/executor",
        headers: {
            "x-api-key": getCredentials().apiKey
        },
        json: {
            "action": "list",
            "entityName": entityName,
            "applicationId": getCredentials().appId,
            "data": data
        }
    };

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
