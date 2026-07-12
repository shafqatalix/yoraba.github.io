---
title: Base64 Encoder/Decoder
description: Encode and decode Base64 strings quickly.
---

# Base64 Encoder/Decoder

Encode text to Base64 or decode Base64 back to plain text.

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
}
</style>

<div class="tool-container">
    <div class="input-group">
        <label for="input-text">Input</label>
        <textarea id="input-text" placeholder="Enter text or Base64 here..."></textarea>
    </div>
    
    <div class="button-group">
        <button id="btn-encode" class="btn">Encode to Base64</button>
        <button id="btn-decode" class="btn">Decode from Base64</button>
        <button id="btn-clear" class="btn btn-secondary">Clear</button>
    </div>

    <div class="input-group">
        <label for="output-text">Output</label>
        <textarea id="output-text" readonly placeholder="Result will appear here..."></textarea>
        <div id="error-msg" class="error-message"></div>
    </div>
    
    <div class="button-group">
        <button id="btn-copy" class="btn btn-secondary">Copy to Clipboard</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const btnEncode = document.getElementById('btn-encode');
    const btnDecode = document.getElementById('btn-decode');
    const btnClear = document.getElementById('btn-clear');
    const btnCopy = document.getElementById('btn-copy');
    const errorMsg = document.getElementById('error-msg');

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
        outputText.value = '';
    }

    function clearError() {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
    }

    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        const binString = Array.from(bytes, (byte) =>
            String.fromCodePoint(byte),
        ).join("");
        return btoa(binString);
    }

    function base64ToUtf8(b64) {
        const binString = atob(b64);
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
        return new TextDecoder().decode(bytes);
    }

    btnEncode.addEventListener('click', () => {
        clearError();
        const input = inputText.value;
        if (!input) {
            outputText.value = '';
            return;
        }
        try {
            outputText.value = utf8ToBase64(input);
        } catch (e) {
            showError('Error encoding to Base64. Input may contain unsupported characters.');
        }
    });

    btnDecode.addEventListener('click', () => {
        clearError();
        const input = inputText.value.trim();
        if (!input) {
            outputText.value = '';
            return;
        }
        try {
            outputText.value = base64ToUtf8(input);
        } catch (e) {
            showError('Error decoding from Base64. Please ensure the input is a valid Base64 string.');
        }
    });

    btnClear.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        clearError();
        inputText.focus();
    });

    btnCopy.addEventListener('click', async () => {
        if (!outputText.value) return;
        try {
            await navigator.clipboard.writeText(outputText.value);
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
