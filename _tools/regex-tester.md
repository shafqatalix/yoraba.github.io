---
title: Regex Tester
description: Test and debug regular expressions with live matching.
---

# Regex Tester

Test your regular expressions against sample text with live highlighting of matches.

<style>
.tool-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-group label {
    font-weight: 600;
    color: var(--headings);
}

.regex-input-wrapper {
    display: flex;
    align-items: center;
    background-color: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.regex-input-wrapper:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.3);
}

.regex-input-wrapper input {
    border: none;
    background: transparent;
    color: var(--code-text);
    outline: none;
    font-family: inherit;
    font-size: inherit;
}

#regex-pattern {
    flex: 1;
    min-width: 50px;
}

#regex-flags {
    width: 60px;
    color: var(--link);
}

.regex-slash {
    color: var(--text-secondary);
    user-select: none;
    font-weight: bold;
    padding: 0 4px;
}

textarea.test-string-input {
    width: 100%;
    min-height: 150px;
    padding: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: var(--code-text);
    background-color: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    resize: vertical;
}

textarea.test-string-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.3);
}

.highlight-output {
    width: 100%;
    min-height: 150px;
    padding: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: var(--code-text);
    background-color: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
}

.match-highlight {
    background-color: rgba(88, 166, 255, 0.3);
    border-radius: 3px;
    border-bottom: 2px solid var(--link);
}

[data-theme="light"] .match-highlight {
    background-color: rgba(9, 105, 218, 0.2);
}

.match-highlight.empty-match {
    border-left: 2px solid #f85149;
    border-right: 2px solid #f85149;
    padding: 0 1px;
    margin: 0 1px;
    background-color: transparent;
    border-bottom: none;
}

.status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: -0.5rem;
}

.error-message {
    color: #f85149;
    font-size: 0.875rem;
    display: none;
}

.snippet-container {
    background-color: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.snippet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background-color: var(--card-bg);
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--headings);
}

.snippet-header .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    background-color: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.snippet-header .btn-sm:hover {
    background-color: var(--border);
    color: var(--text);
}

.snippet-content {
    margin: 0;
    padding: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: var(--code-text);
    white-space: pre-wrap;
    word-break: break-all;
}
</style>

<div class="tool-container">
    <div class="input-group">
        <label for="regex-pattern">Regular Expression</label>
        <div class="regex-input-wrapper">
            <span class="regex-slash">/</span>
            <input type="text" id="regex-pattern" placeholder="Enter regex pattern..." value="([A-Z])\w+">
            <span class="regex-slash">/</span>
            <input type="text" id="regex-flags" placeholder="flags" value="g">
        </div>
        <div id="error-msg" class="error-message"></div>
    </div>
    
    <div class="input-group">
        <label for="test-string">Test String</label>
        <textarea id="test-string" class="test-string-input" placeholder="Enter text to test your regex against...">Hello World! This is a simple Regex Tester tool. It helps you find Matches instantly.</textarea>
    </div>

    <div class="input-group">
        <label>Match Result</label>
        <div id="highlight-output" class="highlight-output"></div>
        <div class="status-bar">
            <span id="match-count">0 matches</span>
        </div>
    </div>
    
    <div class="input-group" style="margin-top: 0.5rem;">
        <label>Code Snippets</label>
        
        <div class="snippet-container">
            <div class="snippet-header">
                <span>JavaScript</span>
                <button class="btn-sm" id="btn-copy-js">Copy</button>
            </div>
            <pre id="snippet-js" class="snippet-content"></pre>
        </div>

        <div class="snippet-container">
            <div class="snippet-header">
                <span>Python</span>
                <button class="btn-sm" id="btn-copy-py">Copy</button>
            </div>
            <pre id="snippet-py" class="snippet-content"></pre>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const patternInput = document.getElementById('regex-pattern');
    const flagsInput = document.getElementById('regex-flags');
    const testStringInput = document.getElementById('test-string');
    const outputDiv = document.getElementById('highlight-output');
    const matchCountSpan = document.getElementById('match-count');
    const errorMsg = document.getElementById('error-msg');
    
    const snippetJs = document.getElementById('snippet-js');
    const snippetPy = document.getElementById('snippet-py');
    const btnCopyJs = document.getElementById('btn-copy-js');
    const btnCopyPy = document.getElementById('btn-copy-py');

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
        patternInput.parentElement.style.borderColor = '#f85149';
        matchCountSpan.textContent = '';
    }

    function clearError() {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
        patternInput.parentElement.style.borderColor = '';
    }
    
    function updateSnippets(pattern, flags) {
        if (!pattern) {
            snippetJs.textContent = '// Enter a pattern to generate code';
            snippetPy.textContent = '# Enter a pattern to generate code';
            return;
        }

        // JavaScript Snippet
        snippetJs.textContent = `const regex = /${pattern}/${flags};\n` +
                                `const str = "your test string";\n\n` +
                                `// Test for match\n` +
                                `const isMatch = regex.test(str);\n\n` +
                                `// Get matches\n` +
                                `const matches = str.match(regex);`;

        // Python Snippet
        let pyFlagsArr = [];
        if (flags.includes('i')) pyFlagsArr.push('re.IGNORECASE');
        if (flags.includes('m')) pyFlagsArr.push('re.MULTILINE');
        if (flags.includes('s')) pyFlagsArr.push('re.DOTALL');
        
        const pyFlagsStr = pyFlagsArr.length > 0 ? ', ' + pyFlagsArr.join(' | ') : '';
        const pyPatternEsc = pattern.replace(/"/g, '\\"');
        
        snippetPy.textContent = `import re\n\n` +
                                `regex = re.compile(r"${pyPatternEsc}"${pyFlagsStr})\n` +
                                `test_str = "your test string"\n\n` +
                                `# Test for match\n` +
                                `is_match = bool(regex.search(test_str))\n\n` +
                                `# Get matches\n` +
                                `matches = regex.findall(test_str)`;
    }
    
    async function copySnippet(btn, content) {
        if (!content || content.includes('Enter a pattern')) return;
        try {
            await navigator.clipboard.writeText(content);
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard', err);
        }
    }

    btnCopyJs.addEventListener('click', () => copySnippet(btnCopyJs, snippetJs.textContent));
    btnCopyPy.addEventListener('click', () => copySnippet(btnCopyPy, snippetPy.textContent));

    function updateMatches() {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const text = testStringInput.value;
        
        outputDiv.innerHTML = '';
        clearError();
        
        updateSnippets(pattern, flags);

        if (!pattern) {
            outputDiv.textContent = text;
            matchCountSpan.textContent = '0 matches';
            return;
        }

        let regex;
        try {
            regex = new RegExp(pattern, flags);
        } catch (e) {
            showError('Invalid Regular Expression: ' + e.message);
            outputDiv.textContent = text;
            return;
        }

        let match;
        let lastIndex = 0;
        let count = 0;

        if (!regex.global) {
            match = regex.exec(text);
            if (match) {
                count = 1;
                outputDiv.appendChild(document.createTextNode(text.substring(0, match.index)));
                
                const span = document.createElement('span');
                span.className = 'match-highlight' + (match[0].length === 0 ? ' empty-match' : '');
                span.textContent = match[0];
                outputDiv.appendChild(span);
                
                outputDiv.appendChild(document.createTextNode(text.substring(match.index + match[0].length)));
            } else {
                outputDiv.textContent = text;
            }
        } else {
            let safeGuard = 0;
            while ((match = regex.exec(text)) !== null) {
                if (safeGuard++ > 50000) {
                    console.warn('Regex match loop interrupted to prevent freezing.');
                    break; 
                }
                
                count++;
                
                if (match.index > lastIndex) {
                    outputDiv.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
                }
                
                const span = document.createElement('span');
                span.className = 'match-highlight' + (match[0].length === 0 ? ' empty-match' : '');
                span.textContent = match[0];
                outputDiv.appendChild(span);
                
                lastIndex = regex.lastIndex;
                
                if (match[0].length === 0) {
                    regex.lastIndex++;
                }
            }
            if (lastIndex < text.length) {
                outputDiv.appendChild(document.createTextNode(text.substring(lastIndex)));
            }
        }

        matchCountSpan.textContent = count === 1 ? '1 match' : `${count} matches`;
    }

    patternInput.addEventListener('input', updateMatches);
    flagsInput.addEventListener('input', updateMatches);
    testStringInput.addEventListener('input', updateMatches);

    // Initial run
    updateMatches();
});
</script>
