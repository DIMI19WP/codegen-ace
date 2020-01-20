export const createElement = <K extends keyof HTMLElementTagNameMap>(tagName: K) => document.createElement(tagName) as unknown as HTMLElementTagNameMap[K];
export const id = <T>(_id: string) => (document.getElementById(_id) as unknown) as T;
export const querySelector = <T>(query: string) => document.querySelector(query) as unknown as T;

export const addKeyboardShortcut = (trigger: string, callback: () => void) => {
    document.addEventListener('keyup', ({ key }) => {
        if (key === trigger) callback();
    });
};
