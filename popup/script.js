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
                'font-family': '',
                'font-size': 18,
                custom: ''
            });
            return;
        }
        Object.keys(config).forEach(
            key => {
              if(key === 'enable') document.getElementById(key).checked = config[key]
              document.getElementById(key).value = config[key]
            }
        );
        console.log(config);
        globalconfig = config;
    });
}
['enable', 'theme', 'font-family', 'font-size', 'custom'].forEach(id => {
    document
        .getElementById(id)
        .addEventListener('change', ({ target }) => {
            if(id === 'enable') globalconfig[id] = target.checked
            else globalconfig[id] = target.value
            setConfig(globalconfig);
        });
});
render();
