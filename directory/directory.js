// This code is licensed under Apache-2.0.
// It is released AS-IS and without warranty.
// This is simply for informational purposes. The creators of this file does
// not endorse any of this information.

const DirectoryBuilder = require('./DirectoryBuilder');
let directory = new DirectoryBuilder();
directory.DirectoryBuilder = DirectoryBuilder;

// Template:
// directory.addAnchor({
//   domain: 'DOMAINDOTCOM',
//   website: 'https://DOMAINDOTCOM',
//   logo: 'DOMAINDOTCOM',
//   color: '#rrggbb',
//   displayName: 'Domain dot com',
// });
// directory.addAsset('DOMAINDOTCOM', {
//   code: 'ASSETCODE_ASSETCODE',
//   issuer: 'Ga_issuer_account_id',
// });


// Assert that each asset has a trading pair
let remainingAssets = Object.assign({}, directory.assets);

for (let pairId in directory.pairs) {
  let pair = directory.pairs[pairId];
  if (pair.baseBuying.code === 'XLM' && pair.baseBuying.issuer === null) {
    delete remainingAssets[pair.counterSelling.code + '-' + pair.counterSelling.issuer];
  } else if (pair.counterSelling.code === 'XLM' && pair.counterSelling.issuer === null) {
    delete remainingAssets[pair.baseBuying.code + '-' + pair.baseBuying.issuer];
  }
}
let remainingAssetKeys = Object.keys(remainingAssets);
if (remainingAssetKeys.length) {
  throw new Error('Missing trading pair. Please use addPair() for asset: ' + remainingAssetKeys[0]);
}

module.exports = directory;
