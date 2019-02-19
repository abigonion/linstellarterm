const React = window.React = require('react');
import Generic from './Generic.jsx';

export default class TermsOfUse extends React.Component {
  render() {
    return <div>
      <Generic>
        <h2 className="Session__welcomeTitle">使用条款</h2>
        <div>
          <h3>1.加密货币风险</h3>
          加密货币资产受到高市场风险和波动性的影响。过去的表现并不预示未来的结果。对区块链资产的投资可能导致部分或全部投资损失。请自己做研究并谨慎使用。您对我们网络上的操作负全部责任。 我们不对您的投资损失负责。
          <br />
          <br />
          加密货币资产和"去中心化交易所”<strong>不受监管</strong>，没有政府监管。
          <br />
          <br />
          <h3>2.隐私</h3>
          你的隐私对我们很重要。请阅读隐私政策以获取更多信息。
          <br />
          <br />
          <h3>3.你自己的责任</h3>
            您（用户）全权负责确保您自己遵守您所在司法辖区的法律和税收。加密货币在您所在的地区可能是非法的。您对自己的安全负全部责任，包括保护您的帐户密钥安全并备份。
          <br />
          <br />
          <h3>4. 免责声明</h3>
            我们是根据Apache-2.0许可证授权的开源软件。它是免费提供的，并且按“原样”提供，不附带任何形式的保证或条件。
          <br />
          <br />
          <h3>5. 联系我们 问题和建议 </h3>
          如您有任何问题或建议，请发电子邮件至 xxx@mail.com，这是属于我们与您沟通的唯一有效和官方电子邮件，所以我们对您未使用有效的联系方式，任何作为或不作为不承担责任。
          我们只通过本网站上的有效的联系方式发布公告和信息或在本网站刊登公告，所以我们对由于您信任了非通过以上方式获得的信息而产生的任何损失不承担责任。
          若您对我们的隐私政策有任何问题, 欢迎随时联系我们。
          {this.props.accept ? <div>
            By pressing "<strong>Accept and Continue</strong>", you acknowledge that you have read this document and agree to these terms of use.
            <div className="Session__tos__next">
              <button className="s-button" onClick={this.props.accept}>Accept and Continue</button>
            </div>
          </div> : null}
        </div>
      </Generic>
    </div>
  }
}

