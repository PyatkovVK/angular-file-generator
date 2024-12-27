export function convertFileNameUtil(string: string, platform?: string): string {
    const matchedString: RegExpMatchArray | null  = string.match(/[A-Z][a-z]+/g);

    let resultString: string = "";

    matchedString?.forEach((str: string) => {
        if (!resultString) {
            resultString = str;

            return;
        }

        resultString += `-${str}`;
    })

    resultString += `.${platform}`;

    return resultString;
}