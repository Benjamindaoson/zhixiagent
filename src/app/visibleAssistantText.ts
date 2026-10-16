/** Remove model reasoning prefixes from UI text, including incomplete streams. */
export function visibleAssistantText(content: string): string {
    let text = content.trimStart();
    while (text) {
        if (/^<think\b/i.test(text)) {
            const closing = /<\/think\b\s*>?/i.exec(text);
            if (!closing) return '';
            text = text.slice(closing.index + closing[0].length).trimStart();
            continue;
        }
        // A stream can stop in the middle of the opening tag.
        if (/^<\/?t(?:h(?:i(?:n(?:k)?)?)?)?$/i.test(text)) return '';
        break;
    }
    return text;
}
