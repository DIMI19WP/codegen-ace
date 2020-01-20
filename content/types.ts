export type EditorOptions = {
    fontFamily?: string;
    fontSize?: string;
    enableSnippets?: boolean;
    enableBasicAutocompletion?: boolean;
    enableLiveAutocompletion?: boolean;
    theme: string;
};

export type Editor = {
    setTheme: (themeName: string) => void;
    getSession: () => {
        setMode: (mode: string) => void;
        on: (event: string, action: () => void) => void;
    };
    setOptions: (option: EditorOptions) => void;
    setValue: (value: string) => void;
    getValue: () => string;
};

export type Ace = {
    edit: (el: HTMLTextAreaElement) => Editor;
    require: (path: string) => void;
};

export type Storage = {
    'codegen-ace': string;
};
