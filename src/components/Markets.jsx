const React = window.React = require('react');
import AssetCard from './AssetCard.jsx';
import AssetPair from './AssetPair.jsx';
import AssetList from './AssetList.jsx';
import CustomMarketPicker from './CustomMarketPicker.jsx';
import Stellarify from '../lib/Stellarify';
import ErrorBoundary from './ErrorBoundary.jsx';
import _ from 'lodash';


export default class Markets extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="so-back islandBack islandBack--t">
          <div className="island">
            <AssetList d={this.props.d}></AssetList>
            <div className="AssetListFooter">
             Tellar 不支持任何发行资产，任何资产都跟我们无关
            </div>
          </div>
        </div>
        <ErrorBoundary>
          <div className="so-back islandBack">
            <CustomMarketPicker row={true}></CustomMarketPicker>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
};
