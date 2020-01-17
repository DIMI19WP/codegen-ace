export type EditorOptions = {
    fontFamily?: string;
    fontSize?: string;
    enableSnippets?: boolean;
    enableBasicAutocompletion?: boolean;
    enableLiveAutocompletion?: boolean;
};
export type Editor = {
    setTheme: (themeName: string) => void;
    getSession: () => {
        setMode: (mode: string) => void;
        on: (event: string, action: (v) => void) => void;
    };
    setOptions: (option: EditorOptions) => void;
    setValue: (value: string) => void;
    getValue: () => string;
};
export type Ace = {
    edit: (el: HTMLTextAreaElement) => Editor;
};
