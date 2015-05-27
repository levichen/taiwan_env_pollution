var React = require('react');
var Actions = require('../../actions/Actions');

var NavBarContentBox = React.createClass({	
  getInitialState: function() {
    return {
      minor: [],
      substrate: []
    }
  },
	componentDidMount: function() {
    var that = this;
		var checkboxs = React.findDOMNode(this.refs.optionSelect).querySelectorAll('input[type=checkbox]');
		for (var i in checkboxs) {
			checkboxs[i].onchange = function() {
            	var checkedValue = document.querySelectorAll('.nav-options:checked');
            	var minor = [], substrate = [];

              for (var j=0; j < checkedValue.length; j++) {
                if (checkedValue[j].getAttribute('data') === '2') {
                  minor.push(checkedValue[j].defaultValue);
                }
                else if (checkedValue[j].getAttribute('data') === '1') {
                  substrate.push(checkedValue[j].defaultValue);
                }
              }
              
              Actions.navBarSelectedData(minor, that.state.minor);
              Actions.navBarSelectSubtrate(substrate, that.state.substrate);
              that.setState({
                minor: minor,
                substrate: substrate
              });
        	};
		}
    },
    renderBox: function() {
        var dataType = this.props.listType;
        var box = this.props.listSub.map(function(subData) {
            var style = {
              background: subData.sub_color
            };
            return (
                <div className="nav-box-content">
                  <div className="nav-box-color"><div style={style} /></div>
                  <div className="nav-box-sub-title">{subData.sub_title}</div>
                  <div className="nav-box-sub-checkbox center">
                     <input type="checkbox" className="nav-options" data={dataType} value={subData.sub_id} />
                  </div>
                </div>
            );
        });
        return (
          <div ref="optionSelect">
			{box}
          </div>
        );
    },
	render: function() {		
		return (
			<div>
				<div className="nav-box-title">{this.props.listTitle}</div>
				{this.renderBox()}
			</div>
		);
	}

});

module.exports = NavBarContentBox;