(function () {
    const suspiciousPattern = /Ã.|Â.|â.|ðŸ|�/;

    function repairMojibake(value) {
        if (typeof value !== "string" || !suspiciousPattern.test(value)) {
            return value;
        }

        let current = value;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const repaired = decodeURIComponent(escape(current));
                if (!repaired || repaired === current) break;
                current = repaired;
            } catch (error) {
                break;
            }
        }

        return current
            .replace(/Â(?=\S)/g, "")
            .replace(/\uFFFD/g, "");
    }

    function shouldSkipNode(node) {
        const parent = node.parentElement || node.parentNode;
        return Boolean(parent && parent.closest && parent.closest("script, style, noscript"));
    }

    function repairTextNode(node) {
        if (!node || !node.nodeValue || shouldSkipNode(node)) return;
        const repaired = repairMojibake(node.nodeValue);
        if (repaired !== node.nodeValue) {
            node.nodeValue = repaired;
        }
    }

    function repairAttributes(element) {
        if (!element || !element.getAttributeNames) return;
        ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
            const value = element.getAttribute(attribute);
            if (!value) return;
            const repaired = repairMojibake(value);
            if (repaired !== value) {
                element.setAttribute(attribute, repaired);
            }
        });
    }

    function repairTree(root) {
        if (!root) return;

        if (root.nodeType === Node.TEXT_NODE) {
            repairTextNode(root);
            return;
        }

        if (root.nodeType === Node.ELEMENT_NODE) {
            repairAttributes(root);
        }

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            repairTextNode(walker.currentNode);
        }

        if (root.querySelectorAll) {
            root.querySelectorAll("*").forEach((element) => repairAttributes(element));
        }
    }

    window.repairMojibake = repairMojibake;

    document.addEventListener("DOMContentLoaded", () => {
        repairTree(document.body);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "characterData") {
                    repairTextNode(mutation.target);
                    return;
                }

                if (mutation.type === "attributes" && mutation.target instanceof Element) {
                    repairAttributes(mutation.target);
                    return;
                }

                mutation.addedNodes.forEach((node) => repairTree(node));
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ["placeholder", "title", "aria-label", "alt"]
        });
    });
})();
