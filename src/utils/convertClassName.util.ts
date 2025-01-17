import { textSerializer } from './text-serializer.util';

export function convertClassNameUtil(input: string): string {
    const matchedString: RegExpMatchArray | null = textSerializer(input);

    return matchedString?.map((item: string) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`).join("") ?? "";
}