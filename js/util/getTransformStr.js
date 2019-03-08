drill.define(() => (transform) => {
    let transformStr = "";
    Object.keys(transform).forEach(k => {
        let val = transform[k];
        transformStr += `${k}(${val}) `;
    });
    return transformStr;
});