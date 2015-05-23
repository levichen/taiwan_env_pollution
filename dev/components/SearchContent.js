var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SearchStore = require('../stores/search_store');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var SearchDetail = React.createClass({
	componentDidMount: function() {
        var closeContent = React.findDOMNode(this.refs.close);
				
        closeContent.addEventListener('click', function() {
			Actions.closeSearchContent();
        });
    },
	render: function() {
		var result = this.props.result;
		var rows = [];
		for(var i in result) {
			var row = result[i];
			var type = {Petition: '陳情', FAPReport: '工廠', Incinerators: '焚化爐', Garbage: '垃圾場' , Airstation: '空氣監控站'}[row.type];
			rows.push(
				<tr>
					<td>{type}</td>
					<td>{row.name || row.FacilityName}</td>
				</tr>
			);
		}
		return (
			<div id="search-content">
			<div className="closeSearch" ref="close">X</div>
			<table >
				<thead>
					<tr>
					<th>類型</th>	
					<th>描述</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			</div>
		)
	}
});

var SearchContent = React.createClass({
	mixins: [Reflux.connect(SearchStore)],
	render: function() {
		var content = [];
		if(this.state.enabled) {
				content.push(<SearchDetail {...this.state}/>);
		}
		return (
			<ReactCSSTransitionGroup transitionName="searchDialog">
				{content}
			</ReactCSSTransitionGroup>
		);
	}

});

module.exports = SearchContent;
