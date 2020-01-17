export const createElement = <K extends keyof HTMLElementTagNameMap>(tagName: K) => document.createElement(tagName) as unknown as HTMLElementTagNameMap[K];
export const id = <T>(_id) => (document.getElementById(_id) as unknown) as T;
export const querySelector = <T>(query) => document.querySelector(query) as unknown as T;