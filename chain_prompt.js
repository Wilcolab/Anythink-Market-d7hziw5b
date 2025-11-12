// chain_prompt.js

/**
 * Chain together an array of prompt fragments into a single prompt suitable
 * for stepwise or multi-turn interactions. This helper produces a numbered
 * sequence of steps and optionally adds a final instruction that asks the
 * model to produce a final consolidated answer.
 *
 * @param {Array<string>} prompts - Array of prompt fragments/steps.
 * @param {object} [options]
 * @param {boolean} [options.numberSteps=true] - Prefix steps with "Step 1:", etc.
 * @param {string} [options.finalInstruction] - Optional closing instruction appended after steps.
 * @returns {string} A single chained prompt string.
 */
function chainPrompts(prompts, options = {}) {
    if (!Array.isArray(prompts)) return '';
    const { numberSteps = true, finalInstruction } = options;

    const parts = prompts
        .filter(p => typeof p === 'string' && p.trim() !== '')
        .map((p, i) => {
            const idx = i + 1;
            if (numberSteps) return `Step ${idx}: ${p.trim()}`;
            return p.trim();
        });

    let result = parts.join('\n\n');

    if (finalInstruction && typeof finalInstruction === 'string' && finalInstruction.trim() !== '') {
        result += '\n\n' + finalInstruction.trim();
    }

    // Ensure final newline
    if (!result.endsWith('\n')) result += '\n';

    return result;
}

module.exports = chainPrompts;
