const React = window.React = require('react');
import Stellarify from '../lib/Stellarify';
import ManageOfferRow from './ManageOfferRow.jsx';
import _ from 'lodash';

export default class ManageOffers extends React.Component {
  constructor(props) {
    super(props);
    this.unsub = this.props.d.session.event.sub(() => {this.forceUpdate()});
  }
  componentWillUnmount() {
    this.unsub();
  }
  render() {
    if (this.props.d.session.state !== 'in') {
      return <div className="island__paddedContent"><a href="#account">登陆</a>查看你的挂单</div>;
    }
    let orderbook = this.props.d.orderbook.data;

    let rectifiedBuyOffers = [];
    let rectifiedSellOffers = [];
    // _.each(fakeOffers, offer => {
    _.each(this.props.d.session.account.offers, offer => {
      if (Stellarify.isOfferRelevant(orderbook.baseBuying, orderbook.counterSelling, offer)) {
        let rectifiedOffer = Stellarify.rectifyOffer(orderbook.baseBuying, orderbook.counterSelling, offer);
        if (rectifiedOffer.side === 'buy') {
          rectifiedBuyOffers.push(rectifiedOffer);
        } else {
          rectifiedSellOffers.push(rectifiedOffer);
        }
      }
    });

    let sortedBuyOffers = _.orderBy(rectifiedBuyOffers, o => {
      return Number(o.price);
    }, 'desc');

    let sortedSellOffers = _.orderBy(rectifiedSellOffers, o => {
      return Number(o.price);
    }, 'asc');

    let buyItems = _.map(sortedBuyOffers, rectifiedOffer => {
      return <ManageOfferRow invert d={this.props.d} rectifiedOffer={rectifiedOffer} key={rectifiedOffer.id}></ManageOfferRow>;
    });
    let sellItems = _.map(sortedSellOffers, rectifiedOffer => {
      return <ManageOfferRow d={this.props.d} rectifiedOffer={rectifiedOffer} key={rectifiedOffer.id}></ManageOfferRow>;
    });

    if (buyItems.length === 0) {
      buyItems = <tr><td className="ManageOffers__table__row__none" colSpan="4">这个交易对你没有买单</td></tr>;
    }
    if (sellItems.length === 0) {
      sellItems = <tr><td className="ManageOffers__table__row__none" colSpan="4">这个交易对你没有卖单</td></tr>;
    }

    return <div className="island--pb">
      <div className="ManageOffers">
        <div className=" island__sub">
          <div className=" island__sub__division">
            <h3 className="island__sub__division__title">你的买单</h3>
            <table className="ManageOffers__table">
              <tbody>
                <tr className="ManageOffers__table__header">
                  <td></td>
                  <td className="ManageOffers__table__header__item">{orderbook.counterSelling.getCode()}</td>
                  <td className="ManageOffers__table__header__item">{orderbook.baseBuying.getCode()}</td>
                  <td className="ManageOffers__table__header__item">价格</td>
                </tr>
                {buyItems}
              </tbody>
            </table>
          </div>
          <div className="island__sub__division">
            <h3 className="island__sub__division__title">你的卖单</h3>
            <table className="ManageOffers__table">
              <tbody>
                <tr className="ManageOffers__table__header">
                  <td className="ManageOffers__table__header__item">价格</td>
                  <td className="ManageOffers__table__header__item">{orderbook.baseBuying.getCode()}</td>
                  <td className="ManageOffers__table__header__item">{orderbook.counterSelling.getCode()}</td>
                  <td></td>
                </tr>
                {sellItems}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  }
};

