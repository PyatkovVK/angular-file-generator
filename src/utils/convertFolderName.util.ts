import { textSerializer } from './text-serializer.util';

export function convertToFolderName(input: string): string {
    const matchedString: RegExpMatchArray | null = textSerializer(input);
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