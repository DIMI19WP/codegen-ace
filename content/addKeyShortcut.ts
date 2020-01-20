import { querySelector } from './utils';
export default (trigger: string) => {
    document.addEventListener('keyup', ({ key }) => {
        if (key === trigger) querySelector<HTMLInputElement>('#Submit').click();
    });
};
