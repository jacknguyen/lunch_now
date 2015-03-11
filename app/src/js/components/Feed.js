/** @jsx React.DOM */

var React = require('react');
var ShowAddButton = require('./ShowAddButton');
var FeedForm = require('./FeedForm');
var FeedList = require('./FeedList');
var Firebase = require('firebase');

var Feed = React.createClass({

	loadData: function () {
		var ref = new Firebase('https://reactjs1.firebaseio.com/feed').orderByChild('voteCount');
		ref.on('value', function(snap) {
			var items = [];

			snap.forEach(function(itemSnap) {
				var item = itemSnap.val();
				item.key = itemSnap.key();
				items.push(item);
			});
			this.setState({
				items: items.reverse()
			});
		}.bind(this));
	},

	componentDidMount: function () {
		this.loadData();
	},

	getInitialState: function () {
		return {
			items: [],
			formDisplayed: false
		}
	},

	onToggleForm: function () {
		this.setState({
			formDisplayed: !this.state.formDisplayed
		});
	},

	onNewItem: function(newItem) {
		var ref = new Firebase('https://reactjs1.firebaseio.com/feed');
		ref.push(newItem);
	},

	onVote: function(item) {
		var reference = new Firebase('https://reactjs1.firebaseio.com/feed').child(item.key);
		reference.update(item)
	},

	render: function() {
		return (
			<div>
				<div className="container">
					<ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
				</div>

				<FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} onToggleForm={this.onToggleForm} />

				<br />
				<br />

				<FeedList items={this.state.items} onVote={this.onVote} />
			</div>
		);
	}

});

module.exports = Feed;