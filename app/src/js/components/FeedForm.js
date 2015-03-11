/** @jsx React.DOM */

var React = require('react');

var FeedForm = React.createClass({

	handleForm: function (event) {
		event.preventDefault(); // so that the form doesn't post back

		var newItem = {
			title: this.refs.title.getDOMNode().value,
			description: this.refs.description.getDOMNode().value,
			voteCount: 0
		};

		this.refs.feedForm.getDOMNode().reset(); // this is why we set a ref on the form itself

		this.props.onNewItem(newItem);

		this.props.onToggleForm();
	},

	render: function() {
		var display = this.props.displayed ? 'block' : 'none';
		var style = {
			display: display
		};

		return (
			<form ref='feedForm' className="container" id="feedForm" style={style} onSubmit={this.handleForm}>
				<div className="form-group">
					<input ref='title' type="text" className="form-control" placeholder="Title" />
					<input ref='description' type="text" className="form-control" placeholder="Description" />
					<button type="submit" className="btn btn-primary btn-block">Add</button>
				</div>
			</form>
		);
	}
});

module.exports = FeedForm;