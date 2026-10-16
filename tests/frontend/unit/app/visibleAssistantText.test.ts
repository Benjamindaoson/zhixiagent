import { describe, expect, it } from 'vitest';
import { visibleAssistantText } from '../../../../src/app/visibleAssistantText';

describe('visibleAssistantText', () => {
    it('removes a complete leading reasoning block', () => {
        expect(visibleAssistantText('<think>private reasoning</think>\nThe answer is 42.'))
            .toBe('The answer is 42.');
    });

    it('hides a reasoning block until its closing tag arrives', () => {
        expect(visibleAssistantText('<think>partial reasoning')).toBe('');
        expect(visibleAssistantText('<thi')).toBe('');
    });

    it('keeps normal content and inline code examples', () => {
        expect(visibleAssistantText('Use `<think>` as a literal example.')).toBe('Use `<think>` as a literal example.');
    });

    it('removes multiple leading reasoning blocks', () => {
        expect(visibleAssistantText(' <think>one</think>\n<think>two</think>\nAnswer'))
            .toBe('Answer');
    });

    it('removes malformed reasoning tags emitted by the configured gateway', () => {
        expect(visibleAssistantText('<think The model reasoned here</think Final answer'))
            .toBe('Final answer');
    });
});
