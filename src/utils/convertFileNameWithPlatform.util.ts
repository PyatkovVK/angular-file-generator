import { Platform } from '../enums/platforms.enum';

export function convertFileNameWithPlatformUtil(string: string, platform?: string): string {
    const matchedString: RegExpMatchArray | null = string.match(/[A-Z][a-z]+/g);

    let resultString: string = "";

    matchedString?.forEach((str: string) => {
        if (!resultString) {
            resultString = str;

            return;
        }

        resultString += `-${str}`;
    });

    resultString += `${platform === Platform.none ? '' : `.${platform}`}`;

    return resultString;
}