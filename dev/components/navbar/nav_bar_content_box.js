var React = require('react');

var NavBarContentBox = React.createClass({	
	componentDidMount: function() {
		var checkboxs = this.refs.optionSelect.getDOMNode().querySelectorAll('input[type=checkbox]');
		for (var i in checkboxs) {
			checkboxs[i].onchange = function() {
            	var checkedValue = document.querySelectorAll('.nav-options:checked');
            	/* call action */
            	console.log(checkedValue)
        	};
		}
    },
    renderBox: function() {
        var box = this.props.listSub.map(function(subData) {
            return (
                <div className="nav-box-content">
                  <div className="nav-box-sub-title">{subData.sub_title}</div>
                  <div className="nav-box-sub-checkbox center">
                     <input type="checkbox" className="nav-options" value={subData.sub_id} />
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