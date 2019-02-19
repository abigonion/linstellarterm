const React = window.React = require('react');
import Stellarify from '../../lib/Stellarify';
import Printify from '../../lib/Printify';
import BalancesTable from './BalancesTable.jsx';
import _ from 'lodash';

export default class MinBalance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let explanation = this.props.d.session.account.explainReserve();
    let minBalanceRows = _.map(explanation.items, (item, index) => {
      return <tr key={index}>
        <td className="MinBalance__table__type">{item.entryType}</td>
        <td>{item.amount}</td>
        <td className="MinBalance__table__lumens">{item.XLM}</td>
      </tr>
    })
    minBalanceRows.push(<tr key={-1} className="MinBalance__table__total">
      <td className="MinBalance__table__type"><strong>Total</strong></td>
      <td></td>
      <td className="MinBalance__table__lumens"><strong>{explanation.totalLumens}</strong></td>
    </tr>);

    return <div>
    <div className="island__sub">
      <div className="island__sub__division MinBalance__sub">
        <br/>
        <p>去中心化网路要求账户保持最低余额。需要1个币的最低余额，账户中如果有挂买单或则卖单的需要额外的0.5个币，您可以在我们的开发者人员文档中阅读有关此内容的更多信息</p>
        <p>每个条目（资产接受，挂单，签名者）将您的最低余额增加0.5 个。 此外，去中心化网络强制执行0.1 个币的额外最低余额，以确保您的帐户仍然可以在不低于网络最低余额要求的情况下进行交易。</p>
      </div>
      <div className="island__sub__division MinBalance__sub MinBalance__sub--table">
        <table className="MinBalance__table">
          <thead className="MinBalance__table__head">
            <tr>
              <td className="MinBalance__table__type">使用类型</td>
              <td>#</td>
              <td className="MinBalance__table__lumens">余额</td>
            </tr>
          </thead>
          <tbody>
            {minBalanceRows}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  }
}
