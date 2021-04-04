export const NEURAUTH_URL = "http://api.neurauth.com";

type Credential = {
    appId: string;
    apiKey: string;
}

let appCredential: Credential = {
    appId: "",
    apiKey: ""
};

export const setupCredentials = (credential: Credential): void => {
    appCredential = credential;
}

export const getCredentials = (): Credential => {
    return appCredential;
}
