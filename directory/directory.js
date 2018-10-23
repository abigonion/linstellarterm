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


// Pairs involving "fiat" assets
// "Fiat" asset should be counterSelling
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['CNY', 'ripplefox.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['JPY', 'vcbear.net'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['EURT', 'tempo.eu.com'],
});
directory.addPair({
  baseBuying: ['BTC', 'naobtc.com'],
  counterSelling: ['EURT', 'tempo.eu.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['HKDT', 'cryptomover.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['COP', 'anclax.com'],
});
directory.addPair({
  baseBuying: ['EURT', 'tempo.eu.com'],
  counterSelling: ['PHP', 'coins.asia'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['PHP', 'coins.asia'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['NGNT', 'cowrie.exchange'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['NGN', 'flutterwave.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['NGN', 'tonaira.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['EUR', 'moni.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['USD', 'golix.io'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['USD', 'stronghold.co'],
});

// Pairs involving "BTC"
// "BTC" should be counterSelling
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['BTC', 'nezly.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['BTC', 'stronghold.co'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['BTC', 'naobtc.com'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['BTC', 'apay.io'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['BTC', 'vcbear.net'],
});
directory.addPair({
  baseBuying: ['XLM', 'native'],
  counterSelling: ['BTC', 'golix.io'],
});

// Pairs involving XLM
// XLM should be counterSelling
directory.addPair({
  baseBuying: ['XIM', 'ximcoin.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['TON', 'tontinetrust.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['TARI', 'cryptotari.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['FRAS', 'frasindo.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['PEDI', 'pedity.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['NEZ', 'nezly.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['ETH', 'nezly.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['SLM', 'superlumen.org'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XRP', 'vcbear.net'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['TELLUS', 'irene.energy'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['TFC', 'thefutbolcoin.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['STEM', 'stemchain.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['ETH', 'stronghold.co'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XLM', 'stronghold.co'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XEL', 'naobtc.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['MOBI', 'mobius.network'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['CHRC', 'charnatoken.top'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['BCH', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['LTC', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['ETH', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['BAT', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['ICN', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['OMG', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['REP', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['ZRX', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['KIN', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['LINK', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['MTL', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['SALT', 'apay.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XIR', 'xirkle.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['SLT', 'smartlands.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['REPO', 'repocoin.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['REPO', 'old.repocoin.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['EQD', 'equid.co'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['SEED', 'collective21.org'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['RMT', 'sureremit.co'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['RMT', 'old.sureremit.co'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['CM3', 'cryptomover.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['CM10', 'cryptomover.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['CMA', 'cryptomover.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['CMS', 'cryptomover.com'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XLQ', 'liquido.i-server.org'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XA9', 'astral9.io'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['WIN', 'winsome.gift'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['XPR', 'pr.network'],
  counterSelling: ['XLM', 'native'],
});
directory.addPair({
    baseBuying: ['TERN', 'ternio.io'],
    counterSelling: ['XLM', 'native'],
});
directory.addPair({
  baseBuying: ['SIX', 'six.network'],
  counterSelling: ['XLM', 'native'],
});

directory.addDestination('GCEGERI7COJYNNID6CYSKS5DPPLGCCLPTOSCDD2LG5SJIVWM5ISUPERI', {
  name: 'Superlumen Issuer',
  requiredMemoType: 'MEMO_ID',
});
directory.addDestination('GA5XIGA5C7QTPTWXQHY6MCJRMTRZDOSHR6EFIBNDQTCQHG262N4GGKTM', {
  name: 'Kraken',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GCGNWKCJ3KHRLPM3TM6N7D3W5YKDJFL6A2YCXFXNMRTZ4Q66MEMZ6FI2', {
  name: 'Poloniex',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GB6YPGW5JFMMP2QB2USQ33EUWTXVL4ZT5ITUNCY3YKVWOJPP57CANOF3', {
  name: 'Bittrex',
  requiredMemoType: 'MEMO_TEXT',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GB7GRJ5DTE3AA2TCVHQS2LAD3D7NFG7YLTOEWEBVRNUUI2Q3TJ5UQIFM', {
  name: 'BTC38',
  requiredMemoType: 'MEMO_ID',
});
directory.addDestination('GBV4ZDEPNQ2FKSPKGJP2YKDAIZWQ2XKRQD4V4ACH3TCTFY6KPY3OAVS7', {
  name: 'Changelly',
  requiredMemoType: 'MEMO_ID',
});
directory.addDestination('GBR3RS2Z277FER476OFHFXQJRKYSQX4Z7XNWO65AN3QPRUANUASANG3L', {
  name: 'PapayaBot',
  requiredMemoType: 'MEMO_TEXT',
  pathPaymentAccepted: true,
  mergeOpAccepted: true,
});
directory.addDestination('GBTBVILDGCOIK26EPEHYCMKM7J5MTQ4FD5DO37GVTTBP45TVGRAROQHP', {
  name: 'KOINEX',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GBGVRE5DH6HGNYNLWQITKRQYGR4PWQEH6MOE5ELPY3I4XJPTZ7CVT4YW', {
  name: 'PapayaSwap',
  requiredMemoType: 'MEMO_TEXT',
});
directory.addDestination('GBQWA6DU6OXHH4AVTFCONQ76LHEWQVZAW7SFSW4PPCAI2NX4MJDZUYDW', {
  name: 'Piiko',
  requiredMemoType: 'MEMO_TEXT',
});
directory.addDestination('GBKTJSNUSR6OCXA5WDWGT33MNSCNQHOBQUBYC7TVS7BOXDKWFNHI4QNH', {
  name: 'Exrates',
  requiredMemoType: 'MEMO_TEXT',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GC4KAS6W2YCGJGLP633A6F6AKTCV4WSLMTMIQRSEQE5QRRVKSX7THV6S', {
  name: 'Indodax',
  requiredMemoType: 'MEMO_TEXT',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GCO2IP3MJNUOKS4PUDI4C7LGGMQDJGXG3COYX3WSB4HHNAHKYV5YL3VC', {
  name: 'Binance',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GAHK7EEG2WWHVKDNT4CEQFZGKF2LGDSW2IVM4S5DP42RBW3K6BTODB4A', {
  name: 'Binance',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GBOEEVARKVASOQSSXCAHNTGJTVALJE2QM3AQQ2K3VXACQ6JJREQRJZKB', {
  name: 'OKEX',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GDZCEWJ5TVXUTFH6V5CVDQDE43KRXYUFRHKI7X64EWMVOVYYZJFWIFQ2', {
  name: 'AEX',
  requiredMemoType: 'MEMO_ID',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GCXDR4QZ4OTVX6433DPTXELCSEWQ4E5BIPVRRJMUR6M3NT4JCVIDALZO', {
  name: 'GOPAX',
  requiredMemoType: 'MEMO_TEXT',
});
directory.addDestination('GBZ35ZJRIKJGYH5PBKLKOZ5L6EXCNTO7BKIL7DAVVDFQ2ODJEEHHJXIM', {
  name: 'XIM',
  acceptedAssetsWhitelist: ['XLM-native'],
});
directory.addDestination('GCZYLNGU4CA5NAWBAVTHMZH4JXWKP2OUJ6OK3I7XXZCNA5622WUJVLTG', {
  name: 'RMT swap',
  acceptedAssetsWhitelist: ['RMT-old.sureremit.co'],
});
directory.addDestination('GBVUDZLMHTLMZANLZB6P4S4RYF52MVWTYVYXTQ2EJBPBX4DZI2SDOLLY', {
  name: 'Pedity Issuer',
  acceptedAssetsWhitelist: [],
});
directory.addDestination('GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH', {
  name: 'Mobius Issuer',
  acceptedAssetsWhitelist: [],
});
directory.addDestination('GDCHDRSDOBRMSUDKRE2C4U4KDLNEATJPIHHR2ORFL5BSD56G4DQXL4VW', {
  name: 'StellarTerm Inflation',
  acceptedAssetsWhitelist: [],
});
directory.addDestination('GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT', {
  name: 'Lumenaut Inflation',
  acceptedAssetsWhitelist: [],
});
directory.addDestination('GBTCBCWLE6YVTR5Y5RRZC36Z37OH22G773HECWEIZTZJSN4WTG3CSOES', {
  name: 'NaoBTC',
  acceptedAssetsWhitelist: ['BTC-naobtc.com'],
});
directory.addDestination('GDRSWSKJCIB6Z65UA7W5RG62A7M5K3A5IHMED6DYHLPLWLVQCOOGDQ7S', {
  name: 'Gate.io',
  requiredMemoType: 'MEMO_ID',
});

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
