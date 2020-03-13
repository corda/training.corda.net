const path = require('path');
const here = `${path.parse(__dirname).base}${path.sep}`;
module.exports = [
    `${here}1_introduction`,
    `${here}2_basics`,
    `${here}3_publicblockchains`,
    `${here}4_consensus`,
    `${here}5_chainofblocks`,
    `${here}6_fundamentals`
];
