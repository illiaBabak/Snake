export function generateKey(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const timestamp = Date.now().toString();
    const timestampLength = timestamp.length;
    let randomString = '';

    for (let i = 0; i < length - timestampLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString + timestamp;
}
