export function textSerializer(input: string): RegExpMatchArray | null {
    const sanitizedInput = input.replace(/[-_]/g, ' ');

    return sanitizedInput.match(/[A-Z][a-z]*/g) || sanitizedInput.match(/[a-z]+/g);
}