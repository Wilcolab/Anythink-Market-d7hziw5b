// refined_prompt.js

/**
 * Refine a raw prompt by normalizing whitespace and applying simple stylistic
 * improvements. This is intentionally conservative — it doesn't attempt
 * to rewrite meaning, only to make prompts more consistent and safe to use.
 *
 * Behaviors:
 * - Trims leading/trailing whitespace.
 * - Collapses repeated whitespace/newlines into single spaces (preserves single newlines if preserveNewlines=true).
 * - Ensures the prompt ends with a single newline.
 * - Optionally enforces polite phrasing by prefixing with a courteous instruction.
 *
 * @param {string} prompt - Raw prompt text.
 * @param {object} [options]
 * @param {boolean} [options.preserveNewlines=false] - Keep single newlines instead of flattening them.
 * @param {boolean} [options.polite=false] - Prepend a polite instruction header.
 * @returns {string} Refined prompt.
 */
function refinePrompt(prompt, options = {}) {
    if (typeof prompt !== 'string') return '';

    const { preserveNewlines = false, polite = false } = options;

    let p = prompt.trim();

    if (p === '') return '';

    if (preserveNewlines) {
        // Collapse multiple consecutive newlines into a single newline
        p = p.replace(/\n{2,}/g, '\n');
        // Collapse runs of spaces/tabs into single space on each line
        p = p.split('\n').map(line => line.replace(/[ \t]{2,}/g, ' ').trim()).join('\n');
    } else {
        // Collapse all whitespace (spaces, tabs, newlines) into single spaces
        p = p.replace(/\s+/g, ' ');
    }

    if (polite) {
        const header = 'Please respond succinctly and politely to the following request:';
        p = `${header}\n\n${p}`;
    }

    // Ensure ending with exactly one newline
    p = p.replace(/\s+$/g, '') + '\n';

    return p;
}

module.exports = refinePrompt;
