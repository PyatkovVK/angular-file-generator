export function convertFileNameUtil(string: string): string {
    const matchedString: RegExpMatchArray | null = string.match(/[A-Z][a-z]+/g);

    let resultString: string = "";

    matchedString?.forEach((str: string) => {
        if (!resultString) {
            resultString = str?.toLowerCase();

            return;
        }

        resultString += `-${str?.toLowerCase()}`;
    });

    return resultString;
}