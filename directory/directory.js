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



directory.addAnchor({
  domain: 'smartlands.io',
  website: 'https://smartlands.io',
  logo: 'liulang',
  color: '#3b65ab',
  displayName: 'Smartlands',
});
directory.addAsset('smartlands.io', {
  code: '流浪地球',
  issuer: 'GCKA6K5PCQ6PNF5RQBF7PQDJWRHO6UOGFMRLK3DYHDOI244V47XKQ4GP',
  instructions: 'https://smartlands.io',
  type: 'token',
});

// Pairs involving CAR
// CAR should be counterSelling
directory.addPair({
  baseBuying: ['流浪地球', 'smartlands.io'],
  counterSelling: ['CAR', 'native'],
});


directory.addAnchor({
  domain: 'exmple.io',
  website: 'https://exmple.io',
  logo: 'meidui',
  color: '#35AB62',
  displayName: 'exmple',
});
directory.addAsset('exmple.io', {
  code: '美国队长3',
  issuer: 'GCKA6K5PCQ6PNF5RQBF7PQDJWRHO6UOGFMRLK3DYHDOI244V47XKQ4GP',
  instructions: 'https://exmple.io',
  type: 'token',
});
directory.addPair({
  baseBuying: ['美国队长3', 'exmple.io'],
  counterSelling: ['CAR', 'native'],
});


// Pairs involving "fiat" assets
// "Fiat" asset should be counterSelling

// Pairs involving "BTC"
// "BTC" should be counterSelling





// Assert that each asset has a trading pair
let remainingAssets = Object.assign({}, directory.assets);

for (let pairId in directory.pairs) {
  let pair = directory.pairs[pairId];
  if (pair.baseBuying.code === 'CAR' && pair.baseBuying.issuer === null) {
    delete remainingAssets[pair.counterSelling.code + '-' + pair.counterSelling.issuer];
  } else if (pair.counterSelling.code === 'CAR' && pair.counterSelling.issuer === null) {
    delete remainingAssets[pair.baseBuying.code + '-' + pair.baseBuying.issuer];
  }
}
let remainingAssetKeys = Object.keys(remainingAssets);
if (remainingAssetKeys.length) {
  throw new Error('Missing trading pair. Please use addPair() for asset: ' + remainingAssetKeys[0]);
}

module.exports = directory;
