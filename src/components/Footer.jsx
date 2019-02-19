const React = window.React = require('react');
import Generic from './Generic.jsx';

export default class Footer extends React.Component {
  render() {
    return <div className="so-back Footer">
      <div className="so-chunk Footer__chunk">
        <div className="Footer__disclaimer">
          加密货币资产受到高市场风险和波动性的影响。过去的表现并不预示未来的结果。对区块链资产的投资可能导致部分或全部投资损失。
        </div>
        <div className="Footer__list">
          <p  className="Footer__list__item"><a href="#privacy">隐私政策</a></p>
          <p  className="Footer__list__item"><a href="#terms-of-use">使用条款</a></p>
        </div>
      </div>
    </div>
  }
}

