const React = window.React = require('react');
import LoginPage from './Session/LoginPage.jsx';
import AccountView from './Session/AccountView.jsx';
import ManageCurrentTrust from './Session/ManageCurrentTrust.jsx';
import ManuallyAddTrust from './Session/ManuallyAddTrust.jsx';
import AddTrustFromFederation from './Session/AddTrustFromFederation.jsx';
import AddTrustFromDirectory from './Session/AddTrustFromDirectory.jsx';
import Send from './Session/Send.jsx';
import Inflation from './Session/Inflation.jsx';
import Deposit from './Session/Deposit.jsx';
import Generic from './Generic.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import Loading from './Loading.jsx';
import HistoryView from './Session/HistoryView.jsx';
import Ellipsis from './Ellipsis.jsx';
import TermsOfUse from './TermsOfUse.jsx';
import clickToSelect from '../lib/clickToSelect';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.listenId = this.props.d.session.event.listen(() => {this.forceUpdate()});
    this.mounted = true;

    // KLUDGE: The event listeners are kinda messed up
    // Uncomment if state changes aren't working. But with the new refactor, this dead code should be removed
    // For now, it's just extra insurance
    this.checkLoginStatus = () => {
      if (this.mounted) {
        if (this.props.d.session.state === 'in' || this.props.d.session.state === 'unfunded' ) {
          this.forceUpdate();
          setTimeout(this.checkLoginStatus, 2000)
        } else {
          setTimeout(this.checkLoginStatus, 100)
        }
      }
    }
    setTimeout(this.checkLoginStatus, 100)
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.d.session.event.unlisten(this.listenId);
  }
  render() {
    let d = this.props.d;
    let state = d.session.state;
    let setupError = d.session.setupError;
    if (state === 'out') {
      return <LoginPage setupError={setupError} d={d} urlParts={this.props.urlParts}></LoginPage>
    } else if (state === 'unfunded') {
      return <Generic title={'Activate your account'}><Loading darker={true} left>
        <div className="s-alert s-alert--success">
          Your Wallet Account ID: <strong>{d.session.unfundedAccountId}</strong>
        </div>
        To use your Stellar account, you must activate it by sending at least 5 lumens (XLM) to your account. You can buy lumens (XLM) from an exchange and send them to your address.
      </Loading></Generic>
    } else if (state === 'loading') {
      return <Generic title="Loading account"><Loading>Contacting network and loading account<Ellipsis /></Loading></Generic>
    } else if (state === 'in') {
      if (!d.session.inflationDone) {
        let currentVoteNote = '';
        if (d.session.account.inflation_destination) {
          currentVoteNote = ' This will overwrite your current inflation destination vote.'
        }
        return <div>
          <Generic>
            <h2 className="Session__welcomeTitle">Welcome to Stellar!</h2>
            <p>Please make sure you have keys securely backed up. Never share your secret key or recovery phrase with anyone.</p>
            <div className="Generic__divider"></div>
            <div className="Session__inflation">
              <br />
              By pressing "Accept and Continue". Thank you for your support!{currentVoteNote}
              <div className="Session__inflation__next">
                <a className="Session__inflation__next__noThanks" onClick={d.session.handlers.noThanks}>No thanks</a>
                <button className="s-button" onClick={d.session.handlers.voteContinue}>Accept and Continue</button>
              </div>
            </div>
          </Generic>
        </div>
      }
      let content;
      let part1 = this.props.urlParts[1];

      if (part1 === undefined) {
        content = <ErrorBoundary>
          <Generic>
            <div className="s-alert s-alert--primary">
              <p className="Sesssion__yourId__title">Your Wallet Account ID</p>
              <strong className="clickToSelect Sesssion__yourId__accountId" onClick={clickToSelect}>{this.props.d.session.account.accountId()}</strong>
            </div>
            <p>要接收付款，请与他们分享您的帐户ID（以G开头）。</p>
          </Generic>
          <Generic noTopPadding>
            <h2>存钱在哪里？</h2>
            <p>在Tellar网络中，资金存在于网络上，只能由拥有密钥的人员移动。这意味着您的密钥非常敏感，任何有权访问它的人都可以移动资金。然而，钱实际上并不是在Tellar。 Tellar只是一个有用的工具，可以帮助您使用密钥进行交易。</p>

            <p><strong>警告</strong>: 小心你的私钥，不要与任何人分享。</p>
          </Generic>
          <AccountView d={d}></AccountView>
        </ErrorBoundary>
      } else if (part1 === 'addTrust') {
        content = <ErrorBoundary>
          <div className="so-back islandBack islandBack--t">
            <ManageCurrentTrust d={d}></ManageCurrentTrust>
          </div>
          <div className="so-back islandBack">
            <AddTrustFromFederation d={d}></AddTrustFromFederation>
          </div>
          <div className="so-back islandBack">
            <AddTrustFromDirectory d={d}></AddTrustFromDirectory>
          </div>
          <div className="so-back islandBack">
            <ManuallyAddTrust d={d}></ManuallyAddTrust>
          </div>
        </ErrorBoundary>
      } else if (part1 === 'send') {
        content = <ErrorBoundary>
          <div className="so-back islandBack islandBack--t">
            <Send d={d}></Send>
          </div>
        </ErrorBoundary>
      } else if (part1 === 'settings') {
        content = <ErrorBoundary>
          <Inflation d={d}></Inflation>
        </ErrorBoundary>
      } else if (part1 === 'history') {
        content = <ErrorBoundary>
          <HistoryView d={d}></HistoryView>
        </ErrorBoundary>
      } else if (part1 === 'deposit') {
        content = (<div><Deposit d={d}/></div>);
      }

      return <div>
        <div className="subNavBackClipper">
          <div className="so-back subNavBack">
            <div className="so-chunk subNav">
              <nav className="subNav__nav">
                <a className={'subNav__nav__item' + (window.location.hash === '#account' ? ' is-current' : '')} href="#account"><span>余额</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/send' ? ' is-current' : '')} href="#account/send"><span>发送</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/addTrust' ? ' is-current' : '')} href="#account/addTrust"><span>接收资产</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/history' ? ' is-current' : '')} href="#account/history"><span>历史</span></a>
                {/*<a className={'subNav__nav__item' + (window.location.hash === '#account/settings' ? ' is-current' : '')} href="#account/settings"><span>Settings</span></a>*/}
                {/*<a className="subNav__nav__item" href="#account/deposit">Deposit</a>*/}
              </nav>
              <nav className="subNav__nav">
                <a className={'subNav__nav__item'} href="#account" onClick={() => {this.props.d.session.handlers.logout();}}><span>Log out</span></a>
              </nav>
            </div>
          </div>
        </div>
        {content}
      </div>
    }
  }
}

export default Session;
