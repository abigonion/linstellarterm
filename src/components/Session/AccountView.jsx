const React = window.React = require('react');
import Stellarify from '../../lib/Stellarify';
import Printify from '../../lib/Printify';
import BalancesTable from './BalancesTable.jsx';
import MinBalance from './MinBalance.jsx';
import _ from 'lodash';

export default class AccountView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <div className="so-back islandBack">
        <div className="island">
          <div className="island__header">
            Balances
          </div>
          <div className="Session__AccountView__content">
            默认情况下，您的帐户仅配置为接受 <strong>XLM</strong>. 要接收其他资产，您必须使用<a href="#account/addTrust">信任</a>的<strong>信任资产</strong> 工具.
          </div>
          <BalancesTable d={this.props.d}></BalancesTable>
        </div>
      </div>
      <div className="so-back islandBack">
        <div className="island">
          <div className="island__header">
            Minimum Balance
          </div>
          <MinBalance d={this.props.d}></MinBalance>
        </div>
      </div>
    </div>
  }
}
