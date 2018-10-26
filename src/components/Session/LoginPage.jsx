const React = window.React = require('react');
const images = require('../../images');
import Ellipsis from '../Ellipsis.jsx';
import clickToSelect from '../../lib/clickToSelect';


// TODO: Move this into Validator
const isValidSecretKey = input => {
  try {
    StellarSdk.Keypair.fromSecret(input);
    return true;
  } catch (e) {
    // console.error(e);
    return false;
  }
}




export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretInput: '',
      show: false,
      invalidKey: false,
      newKeypair: null,
      bip32Path: '0',
      ledgerAdvanced: false,
      termsAccepted: false,
    }


    this.handleInput = (event) => {
      this.setState({secretInput: event.target.value});
    }
    this.handleBip32PathInput = (event) => {
      let value = parseInt(event.target.value);
      if (!Number.isInteger(value)) {
        value = 0;
      }
      if (value < 0) {
        value = 0;
      }
      if (value > 2147483647) { // int32: 2^31-1
        value = 2147483647;
      }
      this.setState({bip32Path: '' + value});
    }
    this.enableAdvanced = () => {
      this.setState({ledgerAdvanced: true});
    }
    this.proceedWithLedger = (event) => {
      event.preventDefault();
      // if (!isValidBip32Path(this.state.bip32Path)) {
      //   return this.setState({
      //     invalidBip32Path: true
      //   });
      // }
      this.props.d.session.handlers.logInWithLedger("44'/148'/" + this.state.bip32Path + "'")
    }
    this.toggleShow = (event) => {
      event.preventDefault();
      this.setState({show: !this.state.show});
    }
    this.handleSubmit = (event) => {
      event.preventDefault();
      if (!isValidSecretKey(this.state.secretInput)) {
        return this.setState({
          invalidKey: true,
        })
      }
      this.props.d.session.handlers.logInWithSecret(this.state.secretInput);
    }
    this.handleGenerate = event => {
      let keypair = StellarSdk.Keypair.random();
      this.setState({
        newKeypair: {
          pubKey: keypair.publicKey(),
          secretKey: keypair.secret(),
        }
      });
    }
  }

  componentDidMount() {
    this.mounted = true;
    setTimeout(this.tickLedger, 1);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let d = this.props.d;
    let errorMessage;
    if (this.state.invalidKey) {
      errorMessage = <div className="s-alert s-alert--alert">Invalid secret key. Hint: it starts with the letter S and is all uppercase</div>
    } else if (this.props.setupError) {
      errorMessage = <div className="s-alert s-alert--alert">Unable to contact network. Please check your internet connection and allow connections to horizon.stellar.org. Maybe an adblocker or plugin (such as Privacy Badger) is preventing the client from communicating with the network.</div>
    }

    let newKeypairDetails;
    if (this.state.newKeypair !== null) {
      newKeypairDetails = <div className="LoginPage__generatedNote">
        <p><strong>Keep your key secure. This secret key will only be showed to you once. StellarTerm does not save it and will not be able to help you recover it if lost.</strong></p>
        <p>Public key (will be your Account ID): {this.state.newKeypair.pubKey}</p>
        <p>Secret key (<strong>SAVE THIS AND KEEP THIS SECURE</strong>): <span className="clickToSelect" onClick={clickToSelect}>{this.state.newKeypair.secretKey}</span></p>
      </div>
    }

    let inputType = this.state.show ? 'text' : 'password';

    let acceptTerms = <label className="s-inputGroup LoginPage__accept">
        <input className="LoginPage__accept__checkbox" type="checkbox" checked={this.state.termsAccepted} onClick={() => this.setState({termsAccepted: !this.state.termsAccepted})} />
        <span className="LoginPage__accept__label">我接受 <a href="#terms-of-use" className="LoginPage__accept__link">使用条款</a> ，了解与加密货币相关的风险.</span>
      </label>

    let body;

    if (this.props.urlParts[0] === 'account') {
      body = <div className="LoginPage__body">
        <div className="LoginPage__greenBox">
          <div className="LoginPage__form">
            <p className="LoginPage__intro">使用您的密钥登录以管理您的帐户。</p>
            <form onSubmit={this.handleSubmit}>
              <label className="s-inputGroup LoginPage__inputGroup">
                <input type={inputType} className="s-inputGroup__item S-flexItem-share LoginPage__password" value={this.state.secretInput} onChange={this.handleInput} placeholder="Secret key (example: SBSMVCIWBL3HDB7N4EI3QKBKI4D5ZDSSDF7TMPB.....)" />
                <div>
                  <a className="LoginPage__show s-button s-button--light" onClick={this.toggleShow}>Show</a>
                </div>
              </label>
              {errorMessage}
              {acceptTerms}
              <div>
                <input type="submit" className="LoginPage__submit s-button" value="Log in" disabled={!this.state.termsAccepted}></input>
              </div>
            </form>
          </div>
          <div className="LoginPage__notes">
            <h3>安全说明</h3>
            <ul>
              <li>检查网址，确保您在正确的网站上。</li>
              <li>Tellar不会保存您的密钥。它存储在您的浏览器中，并在刷新或退出页面后删除。</li>
              <li>Tellar是在Apache 2.0开源协议下发布的。开发人员不对应用程序造成的任何损失和活动负责。</li>
            </ul>
          </div>
        </div>
      </div>
    } else if (this.props.urlParts[0] === 'signup') {
      body = <div className="LoginPage__body">

        <div className="LoginPage__greenBox">
          <div className="LoginPage__form">
            <h3>创建帐户密钥对</h3>
            <p>要开始使用Stellar网络，您必须首先创建一个密钥对（除非您有Ledger Nano）。密钥对由两部分组成：</p>
            <ul className="LoginPage__form__list">
              <li><strong>公 钥</strong>:公钥用于标识帐户。它也被称为帐户。该公钥用于接收资金。</li>
              <li><strong>私 钥</strong>:密钥用于访问您的帐户并进行交易。保持此代码的安全。拥有该代码的任何人都可以完全访问该帐户和资金。如果您丢失了密钥，您将无法再访问资金，也没有恢复机制。</li>
            </ul>
            {acceptTerms}
            <input type="submit" className="LoginPage__generate s-button" onClick={this.handleGenerate} value="Generate keypair" disabled={!this.state.termsAccepted}></input>
            {newKeypairDetails}
          </div>
          <div className="LoginPage__notes">
            <h3>帐户生成安全说明</h3>
            <p>密钥是使用来自<a href="https://github.com/dchest/tweetnacl-js#random-bytes-generation">TweetNaCl's randomByte function</a> 函数的熵生成的，该函数在大多数浏览器中使用来自<a href="https://w3c.github.io/webcrypto/Overview.html">WWeb Cryptography API</a>的getRandomValues。但是，使用<a href="https://github.com/dchest/tweetnacl-js#random-bytes-generation">安全随机数</a>生成并不能保护您免受受感染的计算机的侵害。请务必小心确保您的计算机是安全的，不要在不信任的计算机上运行。</p>
          </div>
        </div>
      </div>
    } else if (this.props.urlParts[0] === 'ledger') {
      let loginForm;
      if (d.session.ledgerConnected) {
        let ledgerSetupErrorMessage;
        let ledgerErrorMessage;
        if (d.session.setupLedgerError) {
          // This usually doesn't happen. To simulate this, find the line:
          // new StellarLedger.Api(new StellarLedger.comm(NUMBER))
          // and change the number to something low so it has a timeout. Or, put in a invalid bip path manually.
          ledgerSetupErrorMessage = <div className="s-alert s-alert--alert LoginPage__error">Connected to Ledger but returned an error: <br /><strong>{d.session.setupLedgerError}</strong></div>
        }

        let customPath = <a className="LoginPage__activateCustomPath" onClick={this.enableAdvanced}>Advanced: Use custom BIP32 path</a>;
        if (this.state.ledgerAdvanced) {
          let inputWidthStyle = {
            width: (this.state.bip32Path.length * 8 + 28) + 'px',
          };
          customPath = <label className="LoginPage__customPath">
            Path: <span className="LoginPage__customPath__surrounding">44'/148'/</span>
            <input style={inputWidthStyle} name="bip32Path" type="text" className="s-inputGroup__item LoginPage__customPath__input" value={this.state.bip32Path} onChange={this.handleBip32PathInput}
              autoFocus
              onFocus={(e) => {
                // Move the carat to the end
                let content = e.target.value;
                e.target.value = '';
                e.target.value = content;
              }}
             />
            <span className="LoginPage__customPath__surrounding">'</span>
          </label>
        }
        loginForm = <div className="LoginPage__form">
          <p className="LoginPage__form--title">Ledger Wallet found and connected!</p>
          <form onSubmit={this.proceedWithLedger}>
            {acceptTerms}

            {ledgerErrorMessage}
            <div className="s-inputGroup LoginPage__inputGroup">
              <input type="submit" className="LoginPage__submit inputGroup__item s-button" value="Sign in with Ledger" disabled={!this.state.termsAccepted}/>
              {customPath}
            </div>
            {ledgerSetupErrorMessage}
          </form>
        </div>
      } else if (!(typeof chrome !== 'undefined' && chrome.runtime)) {
        loginForm = <div className="LoginPage__form LoginPage__form--simpleMessage">
          <p className="LoginPage__form--title">Ledger is not supported on your browser. Please use Google Chrome.</p>
        </div>
      } else if (window.location.protocol !== 'https:') {
        loginForm = <div className="LoginPage__form LoginPage__form--simpleMessage">
          <p className="LoginPage__form--title">Ledger only works on a https site.<br />Please use <a href="https://stellarterm.com/" target="_blank" rel="nofollow noopener noreferrer">https://stellarterm.com/</a></p>
        </div>
      } else if (!d.session.ledgerConnected) {
        loginForm = <div className="LoginPage__form LoginPage__form--simpleMessage">
          <p className="LoginPage__form--title">Scanning for Ledger Wallet connection<Ellipsis /></p>
          <p>Please plug in your Ledger and open the Stellar app. Make sure browser support is set to yes.</p>
          <p>If it still does not show up, restart your Ledger, and refresh this webpage.</p>
        </div>
      } else {

      }

      body = <div className="LoginPage__body">

        <div className="LoginBox__ledgerNanoHeader">
          <img src={images['ledger-logo']} className="img--noSelect" alt="Ledger Logo" width="300" height="80" />
          <img src={images['ledger-nano-s-buttons']} className="img--noSelect" alt="Ledger Nano S" width="382" height="100" />
        </div>

        <div className="LoginPage__greenBox">
          {loginForm}
        </div>
        <div className="LoginBox__spacer">
          <div className="LoginBox__divider"></div>
        </div>
        <div className="LoginPage__paddedBox">
          <h3>Setup instructions</h3>
          <ol>
            <li>Get a Ledger Nano S and connect it to your computer.</li>
            <li>Set up your Ledger Nano S by following instructions on the Ledger site: <a href="https://www.ledgerwallet.com/start/ledger-nano-s" target="_blank" rel="nofollow noopener noreferrer">https://www.ledgerwallet.com/start/ledger-nano-s</a></li>
            <li>Install the <a href="https://www.ledgerwallet.com/apps/manager" target="_blank" rel="nofollow noopener noreferrer">Ledger Manager</a> app on your computer: <a href="https://www.ledgerwallet.com/apps/manager" target="_blank" rel="nofollow noopener noreferrer">https://www.ledgerwallet.com/apps/manager</a></li>
            <li>Inside the Ledger Manager app, go to Applications and install the Stellar app.
              <br />
              <img src={images['ledger-app']} className="img--noSelect" alt="Stellar app installation inside Ledger Manager" width="355" height="77" />
            </li>
            <li>
              On your Ledger device, nagivate to the Stellar app and open the app.
              <br />
              <img src={images['ledger-nano-picture']} className="img--noSelect" alt="Ledger Nano photo" width="300" height="135" />
            </li>
            <li>
              Inside the app, go to <strong>Settings</strong>, then <strong>Browser support</strong>, then select <strong>yes</strong> and press both buttons.
            </li>
          </ol>
        </div>
        <div className="LoginPage__paddedBox">
          <h3>Notes</h3>
          <ul>
            <li>Ledger Nano S support is available on Chrome and Opera.</li>
            <li>Install the Stellar app with the <a href="https://www.ledgerwallet.com/apps/manager" target="_blank" rel="nofollow noopener noreferrer">Ledger Manager</a>.</li>
            <li>Enable browser support in the app settings.</li>
            <li>Choose the BIP32 path of the account you want use: 44'/148'/n' where n is the account index. Or use the default account 44'/148'/0'.</li>
          </ul>
        </div>
      </div>
    }

    return <div className="so-back islandBack islandBack--t">
      <div className="island">
        <div className="island__header">
          访问您的帐户
        </div>
        <div className="LoginPage">
          <div className="LoginPage__sidebar">
            <a className={'LoginPage__sidebar__tab' + (this.props.urlParts[0] === 'signup' ? ' is-active' : '')} href="#signup">
             新建账号
            </a>
            <a className={'LoginPage__sidebar__tab' + (this.props.urlParts[0] === 'account' ? ' is-active' : '')} href="#account">
             通过私钥登录
            </a>
            {/*<a className={'LoginPage__sidebar__tab' + (this.props.urlParts[0] === 'ledger' ? ' is-active' : '')} href="#ledger">*/}
              {/*<img className="LoginPage__sidebar__tab__img--invertible img--noSelect" src={images['ledger-logo']} alt="Ledger" width="75" height="20" />*/}
            {/*</a>*/}
          </div>
          {body}
        </div>
      </div>
    </div>
  }
}
