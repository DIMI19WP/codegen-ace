let globalconfig = {};
function setConfig(config) {
    chrome.storage.sync.set({ 'codegen-ace': JSON.stringify(config) });
    render();
}
function render() {
    chrome.storage.sync.get('codegen-ace', _config => {
        const config = JSON.parse(_config['codegen-ace']);
        if (!config.theme) {
            setConfig({
                enable: true,
                theme: 'monokai',
                'font-family': undefined,
                'font-size': 18,
                custom: undefined,
                autoinject: true,
                'editor-width': undefined,
                'editor-height': undefined
            });
            return;
        }
        Object.keys(config).forEach(key => {
            if (typeof config[key] === 'boolean') {
                console.log(document.getElementById(key), key)
                document.getElementById(key).checked = config[key];
                return;
            }
            document.getElementById(key).value = config[key];
        });
        console.log(config);
        globalconfig = config;
    });
}
[
    'enable',
    'theme',
    'font-family',
    'font-size',
    'custom',
    'autoinject',
    'editor-width',
    'editor-height'
].forEach(id => {
    document.getElementById(id).addEventListener('change', ({ target }) => {
        if (target.type === 'checkbox') globalconfig[id] = target.checked;
        else globalconfig[id] = target.value;
        setConfig(globalconfig);
    });
});
render();
document
    .getElementById('advanced')
    .addEventListener(
        'click',
        () =>
            (document.getElementById(
                'customcon'
            ).style.display = document.getElementById('advanced').checked
                ? 'block'
                : 'none')
    );
[...document.getElementsByTagName('a')].forEach(el =>
    el.addEventListener('click', () => chrome.tabs.create({ url: el.href }))
);
