import { LoginData } from "src/types/otherTypes";

function isLoginData(data: unknown): data is LoginData {
    return (
        !!data &&
        typeof data === 'object' && 'login' in data && 'password' in data
        && typeof data.login === 'string' && typeof data.password === 'string'
    );
}

function isLoginDataArr(data: unknown): data is LoginData[] {
    return Array.isArray(data) && data.every((el) => isLoginData(el));
}

export function getAdminData(): LoginData[] {
    const storageData = localStorage.getItem('admin');
    const parsedData: unknown = storageData ? JSON.parse(storageData) : null;
    const adminData = isLoginDataArr(parsedData) ? parsedData : [];
    return adminData;
}