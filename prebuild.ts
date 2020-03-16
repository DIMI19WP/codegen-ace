import {emptyDir, copy} from 'fs-extra';
 
(async () => {
    await emptyDir('dist');
    await copy('./public', './dist');
})();