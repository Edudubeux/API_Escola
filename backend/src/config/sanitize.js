import sanitizeHtml from 'sanitize-html';

const sanitize = value => {
    if(!value) {
        return null;
    }

    const clean = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: []
    });

    return clean || null;
};

export default sanitize;