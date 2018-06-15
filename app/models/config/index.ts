type Origin = string;

interface Api {
    users: string;
}

interface Config {
    Api: { users: string; };
    Origin: Origin;
}

declare const CONFIG: Config;
export const ApiUrl: Api = CONFIG.Api;
export const Origin: Origin = CONFIG.Origin;