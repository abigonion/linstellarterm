const React = window.React = require('react');
import Stellarify from '../lib/Stellarify';
import Printify from '../lib/Printify';
import BigNumber from 'bignumber.js';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TrustButton from './Session/TrustButton.jsx';

// OfferMaker is an uncontrolled element (from the perspective of its users)
export default class OfferMaker extends React.Component {
  initialize() {
    if (!this.initialized) {
      this.initialized = true;
      let state = {};

      // Initialize price
      if (this.props.side === 'buy' && this.props.d.orderbook.data.bids.length > 0) {
        state.price = new BigNumber(this.props.d.orderbook.data.bids[0].price).toString() // Get rid of extra 0s
      } else if (this.props.d.orderbook.data.asks.length > 0) { // Proptypes validation makes sure this is sell
        state.price = new BigNumber(this.props.d.orderbook.data.asks[0].price).toString() // Get rid of extra 0s
      }

      state.errorType = '';

      return state;
    }
    return {};
  }
  capDigits(input) {
    try {
      return new BigNumber(input).toFixed(7).toString();
    } catch (e) {
      return input;
    }
  }
  componentWillUnmount() {
    this.orderbookUnsub();
    this.sessionUnsub();
  }
  constructor(props) {
    super(props);
    this.initialized = false;

    this.orderbookUnsub = this.props.d.orderbook.event.sub((data) => {
      if (data && data.pickPrice) {
        this.updateState('price', data.pickPrice);
      }
    });
    this.sessionUnsub = this.props.d.session.event.sub(() => {this.forceUpdate()});



    this.state = {
      valid: false,
      price: '', // Most sticky item (since the price is pretty static)
      amount: '',

      // Total = price * amount
      total: '',
      buttonState: 'ready', // ready or pending
      errorMessage: false,
      successMessage: '',
    };

    if (this.props.d.orderbook.data.ready) {
      this.state = Object.assign(this.state, this.initialize());
    }

    // TODO: Limit the number of digits after the decimal that can be input
    this.updateState = (item, value) => {
      let state = Object.assign(this.state, {
        // Reset messages
        successMessage: '',
        errorMessage: false,
      });
      state.valid = false;
      if (item == 'price') {
        state.price = value;
      } else if (item == 'amount') {
        state.amount = value;
      } else if (item == 'total') {
        state.total = value;
      } else {
        throw new Error('Invalid item type');
      }

      try {
        // If there is an error, we will just let the user input change but not the affected inputs
        if (item == 'price') {
          state.total = new BigNumber(new BigNumber(value).times(new BigNumber(state.amount)).toFixed(7)).toString();
        } else if (item == 'amount') {
          state.total = new BigNumber(new BigNumber(value).times(new BigNumber(state.price)).toFixed(7)).toString();
        } else if (item == 'total') {
          state.amount = new BigNumber(new BigNumber(value).dividedBy(new BigNumber(state.price)).toFixed(7)).toString();
        } else {
          throw new Error('Invalid item type');
        }

        // TODO: truer valid
        state.valid = true;
      } catch(e) {
        // Invalid input somewhere
      }
      this.setState(state);
    }

    this.handleSubmit = (e) => {
      // TODO: Hook up with driver
      e.preventDefault();
      props.d.session.handlers.createOffer(props.side, {
        price: this.state.price,
        amount: this.state.amount,
        total: this.state.total,
      })
      .then(signAndSubmitResult => {
        if (signAndSubmitResult.status === 'finish') {
          this.setState({
            valid: false,
            buttonState: 'pending',
            amount: '',
            total: '',
            successMessage: '',
            errorMessage: false,
          });

          signAndSubmitResult.serverResult
          .then(result => {
            this.setState({
              buttonState: 'ready',
              successMessage: 'Offer successfully created',
            })
          })
          .catch(result => {
            let errorType;
            try {
              if (result.data === undefined) {
                errorType = 'clientError - ' + result.message;
              } else if (result.data && result.data.extras) {
                if (result.data.extras.result_codes.operations === undefined) {
                  errorType = result.data.extras.result_codes.transaction;
                } else {
                  // Common errors:
                  // errorType = 'buy_not_authorized'
                  // errorType = 'op_low_reserve'
                  errorType = result.data.extras.result_codes.operations[0];
                }
              } else {
                errorType = 'unknownResponse - ' + e.message;
              }
            } catch(e) {
              console.error(e)
              errorType = 'unknownResponse - ' + e.message;
            }

            this.setState({
              buttonState: 'ready',
              errorMessage: true,
              errorType,
            })
          })
        }
      })
    }
  }
  render() {
    if (!this.props.d.orderbook.data.ready) {
      return <div>载入中</div>;
    }

    let capitalizedSide = 'Buy';
    if (this.props.side === 'sell') {
      capitalizedSide = 'Sell';
    }

    let baseBuying = this.props.d.orderbook.data.baseBuying;
    let counterSelling = this.props.d.orderbook.data.counterSelling;

    let baseAssetName = this.props.d.orderbook.data.baseBuying.getCode();
    let counterAssetName = this.props.d.orderbook.data.counterSelling.getCode();

    let title;
    if (this.props.side === 'buy') {
      title = `使用${counterAssetName} 买${baseAssetName}`;
    } else {
      title = `使用${baseAssetName}卖${counterAssetName} `;
    }

    let youHave;
    let hasAllTrust = false;
    let insufficientBalanceMessage;
    let trustNeededAssets = [];

    if (this.props.d.session.state === 'in') {
      let baseBalance = this.props.d.session.account.getBalance(this.props.d.orderbook.data.baseBuying);
      let counterBalance = this.props.d.session.account.getBalance(this.props.d.orderbook.data.counterSelling);

      if (baseBalance === null) {
        trustNeededAssets.push(this.props.d.orderbook.data.baseBuying);
      }
      if (counterBalance === null) {
        trustNeededAssets.push(this.props.d.orderbook.data.counterSelling);
      }

      if (baseBalance !== null && counterBalance !== null) {
        hasAllTrust = true;
      }
      let targetBalance = this.props.side === 'buy' ? counterBalance : baseBalance;
      let targetAsset = this.props.side === 'buy' ? this.props.d.orderbook.data.counterSelling : this.props.d.orderbook.data.baseBuying;

      if (targetBalance) {
        let inputSpendAmount = this.props.side === 'buy' ? this.state.total : this.state.amount;
        let maxOffer = targetBalance;
        if (targetAsset.isNative()) {
          maxOffer = this.props.d.session.account.maxLumenSpend();
          youHave = <div className="OfferMaker__youHave">你能够交易 {maxOffer} CAR (在于 <a href="#account">你账户的最低额度</a>).</div>;
        } else {
          youHave = <div className="OfferMaker__youHave">你有 {targetBalance} {targetAsset.getCode()}</div>;
        }
        if (Number(inputSpendAmount) > Number(maxOffer)) {
          insufficientBalanceMessage = <p className="OfferMaker__insufficientBalance">错误: 你没有足够的{targetAsset.getCode()} 创建订单.</p>;
        }
      } else {
        youHave = <div>
          <p className="OfferMaker__youHave">必须 <a href="#account/addTrust">接受 {targetAsset.getCode()}</a>资产</p>

        </div>
      }
    }

    let submit;
    let acccept;
    if (this.props.d.session.state === 'in') {
      if (this.state.buttonState === 'ready') {
        if (hasAllTrust) {
          submit = <input type="submit" className="s-button" value={capitalizedSide + ' ' + baseAssetName} disabled={!this.state.valid || insufficientBalanceMessage}></input>
        } else {
          submit = <input type="submit" className="s-button" value="Action required: accept asset" disabled={true}></input>
          acccept = <div>要解决此问题，请转到<a href="#account/addTrust">账户页面并接受</a>这个资产.</div>
        }
      } else {
        submit = <input type="submit" className="s-button" disabled={true} value="Creating offer..." disabled={true}></input>
      }
    } else {
      submit = <span className="OfferMaker__message"><a href="#account">登陆</a>去交易</span>
    }

    let summary;
    if (this.state.valid) {
      if (this.props.side === 'buy') {
        summary = <div className="s-alert s-alert--info">Buy {this.state.amount} {this.capDigits(baseAssetName)} for {this.capDigits(this.state.total)} {counterAssetName}</div>;
      } else {
        summary = <div className="s-alert s-alert--info">Sell {this.state.amount} {this.capDigits(baseAssetName)} for {this.capDigits(this.state.total)} {counterAssetName}</div>;
      }
    }

    let error;
    if (this.state.errorMessage) {
      if (this.state.errorType === 'buy_not_authorized') {
        error = <div className="s-alert s-alert--alert OfferMaker__message">
          由于发行人未授权您交易此资产，因此无法创建要约。 要解决此问题，请查看发行人的网站。<br /><br />注意：一些发行人对他们授权的人有限制。
        </div>;
      } else if (this.state.errorType === 'op_low_reserve') {
        error = <div className="s-alert s-alert--alert OfferMaker__message">您的帐户没有足够的CAR来满足最低余额. 有关详细信息<a href="#account"></a>请看账户界面<br /><br />解决方案:
          <ul className="OfferMaker__errorList">
            <li>向您的帐户发送至少1个CAR</li>
            <li> 通过<a href="#account/addTrust">取消接受资产来降低最低余额</a></li>
          </ul>
        </div>;
      } else if (this.state.errorType === 'tx_bad_seq') {
        error = <div className="s-alert s-alert--alert OfferMaker__message">
          事务失败，因为序列不同步。 请重新加载并重试。
        </div>;
      } else {
        error = <div className="s-alert s-alert--alert OfferMaker__message">无法去创建订单
          <ul className="OfferMaker__errorList">
            <li>错误代码: {this.state.errorType}</li>
          </ul>
        </div>;
      }
    }

    let success;
    if (this.state.successMessage !== '') {
      success = <div className="s-alert s-alert--success OfferMaker__message">{this.state.successMessage}</div>;
    }

    let overview;

    if (this.props.d.session.state === 'in' && !hasAllTrust) {
      overview = <div>
        <p className="OfferMaker__enable">要进行交易，请在您的帐户中激活这些资产:</p>
        {trustNeededAssets.map((asset, index) => {
          return <TrustButton
            key={asset.getCode() + '-' + asset.getIssuer()}
            d={this.props.d}
            asset={asset}
            message={asset.getCode() + " accepted"}
            trustMessage={"Accept " + asset.getCode()}
            />
        })}
      </div>
    } else {
      overview = <div className="OfferMaker__overview">
        {youHave}
        {insufficientBalanceMessage}
        {summary}
        {error}
        {success}
        {submit}
        {acccept}
      </div>
    }

    return <div>
      <h3 className="island__sub__division__title island__sub__division__title--left">{title}</h3>
      <form onSubmit={this.handleSubmit}  disabled={!this.state.valid || this.state.buttonState === 'pending'}>
        <table className="OfferMaker__table">
          <tbody>
            <tr className="OfferMaker__table__row">
              <td className="OfferMaker__table__label">价格</td>
              <td className="OfferMaker__table__input">
                <label className="OfferMaker__table__input__group">
                  <input type="text" className="OfferMaker__table__input__input" value={this.state.price} onChange={(e) => this.updateState('price', e.target.value)} placeholder="" />
                  <div className="OfferMaker__table__input__group__tag">
                    {counterAssetName}
                  </div>
                </label>
              </td>
            </tr>
            <tr className="OfferMaker__table__row">
              <td className="OfferMaker__table__label">数量</td>
              <td className="OfferMaker__table__input">
                <label className="OfferMaker__table__input__group">
                  <input type="text" className="OfferMaker__table__input__input" value={this.state.amount} onChange={(e) => this.updateState('amount', e.target.value)} placeholder="" />
                  <div className="OfferMaker__table__input__group__tag">
                    {baseAssetName}
                  </div>
                </label>
              </td>
            </tr>
            <tr className="OfferMaker__table__row">
              <td className="OfferMaker__table__label">总数</td>
              <td className="OfferMaker__table__input">
                <label className="OfferMaker__table__input__group">
                  <input type="text" className="OfferMaker__table__input__input" value={this.state.total} onChange={(e) => this.updateState('total', e.target.value)} placeholder="" />
                  <div className="OfferMaker__table__input__group__tag">
                    {counterAssetName}
                  </div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        {overview}
      </form>
    </div>
  }
};

OfferMaker.propTypes = {
  side: PropTypes.oneOf(['buy', 'sell']).isRequired,
}
