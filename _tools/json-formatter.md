---
title: JSON Formatter
description: Format and validate JSON data with syntax highlighting.
---

# JSON Formatter

A simple tool to format, validate, and beautify JSON data.

Paste your JSON below and get a formatted, readable output with syntax highlighting.

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

.input-group textarea {
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

.input-group textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.3);
}

.json-output {
    width: 100%;
    min-height: 250px;
    padding: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: var(--code-text);
    background-color: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
}

.button-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    color: #ffffff;
    background-color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn:hover {
    background-color: #2ea043;
}

.btn-secondary {
    background-color: var(--card-bg);
    color: var(--text);
    border-color: var(--border);
}

.btn-secondary:hover {
    background-color: var(--border);
}

.error-message {
    color: #f85149;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: none;
    padding: 0.75rem;
    background-color: rgba(248, 81, 73, 0.1);
    border: 1px solid rgba(248, 81, 73, 0.4);
    border-radius: 6px;
}

/* Syntax Highlighting Colors */
.json-key { color: var(--link); }
.json-string { color: var(--accent); }
.json-number { color: #d2a8ff; }
.json-boolean { color: var(--link); font-weight: 600; }
.json-null { color: var(--text-secondary); font-style: italic; }

[data-theme="light"] .json-number { color: #8250df; }
</style>

<div class="tool-container">
    <div class="input-group">
        <label for="input-json">Input JSON</label>
        <textarea id="input-json" placeholder='{"example": "Paste your JSON here..."}'></textarea>
    </div>
    
    <div class="button-group">
        <button id="btn-format-2" class="btn">Format (2 spaces)</button>
        <button id="btn-format-4" class="btn btn-secondary">Format (4 spaces)</button>
        <button id="btn-minify" class="btn btn-secondary">Minify</button>
        <button id="btn-clear" class="btn btn-secondary">Clear</button>
    </div>

    <div class="input-group">
        <label for="output-json">Output</label>
        <div id="error-msg" class="error-message"></div>
        <pre id="output-json" class="json-output"></pre>
    </div>
    
    <div class="button-group">
        <button id="btn-copy" class="btn btn-secondary">Copy to Clipboard</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const inputJson = document.getElementById('input-json');
    const outputJson = document.getElementById('output-json');
    const btnFormat2 = document.getElementById('btn-format-2');
    const btnFormat4 = document.getElementById('btn-format-4');
    const btnMinify = document.getElementById('btn-minify');
    const btnClear = document.getElementById('btn-clear');
    const btnCopy = document.getElementById('btn-copy');
    const errorMsg = document.getElementById('error-msg');

    let currentOutputText = '';

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
        outputJson.innerHTML = '';
        currentOutputText = '';
    }

    function clearError() {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
    }

    function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                    return '<span class="' + cls + '">' + match.slice(0, -1) + '</span>:';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function processJson(indentation) {
        clearError();
        const input = inputJson.value.trim();
        if (!input) {
            outputJson.innerHTML = '';
            currentOutputText = '';
            return;
        }
        try {
            const parsed = JSON.parse(input);
            currentOutputText = indentation !== undefined 
                ? JSON.stringify(parsed, null, indentation) 
                : JSON.stringify(parsed);
            
            outputJson.innerHTML = syntaxHighlight(currentOutputText);
        } catch (e) {
            showError('Invalid JSON: ' + e.message);
        }
    }

    btnFormat2.addEventListener('click', () => processJson(2));
    btnFormat4.addEventListener('click', () => processJson(4));
    btnMinify.addEventListener('click', () => processJson());

    btnClear.addEventListener('click', () => {
        inputJson.value = '';
        outputJson.innerHTML = '';
        currentOutputText = '';
        clearError();
        inputJson.focus();
    });

    btnCopy.addEventListener('click', async () => {
        if (!currentOutputText) return;
        try {
            await navigator.clipboard.writeText(currentOutputText);
            const originalText = btnCopy.textContent;
            btnCopy.textContent = 'Copied!';
            setTimeout(() => {
                btnCopy.textContent = originalText;
            }, 2000);
        } catch (err) {
            showError('Failed to copy to clipboard.');
        }
    });
});
</script>
