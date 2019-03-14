const React = window.React = require('react');
import OfferTables from './OfferTables.jsx';
import PairPicker from './PairPicker.jsx';
import OfferMakers from './OfferMakers.jsx';
import ManageOffers from './ManageOffers.jsx';
import PriceChart from './PriceChart.jsx';
import Generic from './Generic.jsx';
import Stellarify from '../lib/Stellarify';
import TermsOfUse from './TermsOfUse.jsx';
import Ellipsis from './Ellipsis.jsx';
import directory from '../../directory';

export default class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.unsub = this.props.d.orderbook.event.sub(() => {this.forceUpdate()});
    this.unsubSession = this.props.d.session.event.sub(() => {this.forceUpdate()});
  }
  componentWillUnmount() {
    this.unsub();
    this.unsubSession();
  }
  render() {

    if (!this.props.d.orderbook.data.ready) {
      return <Generic title="Loading orderbook">从Horizon中加载交易数据<Ellipsis /></Generic>
    }

    let thinOrderbookWarning;
    let data = this.props.d.orderbook.data;
    let ticker = this.props.d.ticker;
    let warningWarning;

    if (ticker.ready) {
      let baseSlug = Stellarify.assetToSlug(data.baseBuying);
      let counterSlug = Stellarify.assetToSlug(data.counterSelling);

      let aggregateDepth = 0;

      if (baseSlug !== 'CAR-native') {
        for (let i in ticker.data.assets) {
          if (ticker.data.assets[i].slug === baseSlug) {
            aggregateDepth += ticker.data.assets[i].depth10_USD;
          }
        }
      }
      if (counterSlug !== 'CAR-native') {
        for (let i in ticker.data.assets) {
          if (ticker.data.assets[i].slug === counterSlug) {
            aggregateDepth += ticker.data.assets[i].depth10_USD;
          }
        }
      }

      if (aggregateDepth < 10) {
        thinOrderbookWarning = <div className="Exchange__warning">
          <div className="s-alert s-alert--warning">
           这个交易对的挂单很少。
          </div>
        </div>
      }


    }

    let directoryAsset = directory.getAssetByAccountId(data.baseBuying.code, data.baseBuying.issuer);
    if (directoryAsset !== null && directoryAsset.warning !== undefined) {
      warningWarning = <div className="Exchange__warning">
        <div className="s-alert s-alert--warning">
          {directoryAsset.warning}
        </div>
      </div>
    }

    let offermakers;
    if (directoryAsset !== null && directoryAsset.disabled !== undefined) {
      offermakers = <div className="Exchange__orderbookDisabled">
       交易对已被禁用，你仍然能够删除你已经存在对挂单。
      </div>
    } else {
      offermakers = <OfferMakers d={this.props.d}></OfferMakers>
    }

    return <div>
      <div className="so-back islandBack islandBack--t">
        <PairPicker d={this.props.d}></PairPicker>
      </div>
      <PriceChart d={this.props.d}></PriceChart>
      <div className="so-back islandBack">
        <div className="island Exchange__orderbook"Orderbook>
          <div className="island__header">
            交易订单
          </div>
          {thinOrderbookWarning}
          {warningWarning}
          <div>
            {offermakers}
            <div className="island__separator"></div>
            <OfferTables d={this.props.d}></OfferTables>
          </div>
        </div>
      </div>
      {/*<div className="so-back islandBack">*/}
        {/*<div className="island">*/}
          {/*<div className="island__header">*/}
            {/*Manage offers*/}
          {/*</div>*/}
          {/*<ManageOffers d={this.props.d}></ManageOffers>*/}
        {/*</div>*/}
      {/*</div>*/}
    </div>
  }
}

