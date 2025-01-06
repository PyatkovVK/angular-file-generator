export function convertToClassName(name: string, platform?: string): string {
    if (!platform) {
        return name;
    }

    return name + platform[0].toUpperCase() + platform.slice(1);
}