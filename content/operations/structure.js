const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}introduction`,
    `${here}package-jar`,
    `${here}test-net`,
    `${here}spin-up-vm`,
    `${here}proper-db`,
    `${here}deploy-remove`,
    `${here}upgrades`,
    `${here}further-study`
];
