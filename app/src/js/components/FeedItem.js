/** @jsx React.DOM */

var React = require('react');

var FeedItem = React.createClass({

	vote: function (newCount) {
		this.props.onVote({
			key: this.props.id,
			title: this.props.title,
			description: this.props.description,
			voteCount: newCount
		});
	},

	voteUp: function () {
		var count = parseInt(this.props.voteCount, 10);
		var newCount = count + 1;
		this.vote(newCount);
	},

	voteDown: function () {
		var count = parseInt(this.props.voteCount, 10);
		var newCount = count - 1;
		this.vote(newCount);
	},

	render: function() {
		var badgeColor = this.props.voteCount >= 0 ? "badge alert-success" : "badge alert-danger";
		return (
			<li key={this.props.key} className="list-group-item container">
				<span className={badgeColor}>{this.props.voteCount}</span>
				<h4>{this.props.title}</h4>
				<span>{this.props.description}</span>
				<span className="pull-right">
					<button id="up" className="btn btn-sm btn-primary" onClick={this.voteUp}>&uarr;</button>
					<button id="down" className="btn btn-sm btn-primary" onClick={this.voteDown}>&darr;</button>
				</span>
			</li>
		);
	}

});

module.exports = FeedItem;