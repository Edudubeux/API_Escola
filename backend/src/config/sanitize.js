import sanitizeHtml from 'sanitize-html'

const sanitize = value => {
    let nullValue = null;

    if(!value) {
        return nullValue;
    }

    const clean = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: []
    });

    const response = clean ? clean : null;

    return response;
};


export default sanitize;