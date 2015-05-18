var React = require('react');

var NavBarContentBox = React.createClass({	
	
	render: function() {
		var props = this.props;
		var box = props.listSub.map(function(subData) {
			return (
                <div className="nav-box-content">
                	<div className="nav-box-sub-title">{subData.sub_title}</div>
                	<div className="nav-box-sub-checkbox center"><input type="checkbox" value={subData.sub_id} /></div>
                </div>
            );
		});
		
		return (
			<div>
				<div className="nav-box-title">{props.listTitle}</div>
				{box}
			</div>
		);
	}

});

module.exports = NavBarContentBox;