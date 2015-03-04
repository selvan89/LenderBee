var React = require('react');
var Reflux = require('reflux');
var reviewStore = require('./../../stores/reviews.js');
var actions = require('./../../actions/actions.js');

var ReviewBox = React.createClass({
  //listens to messagingStore
  mixins: [Reflux.connect(reviewStore)],

  // TODO: How do we grab the index/rating from the rating component?
  handleSubmit: function(e) {
    e.preventDefault();

    // [Note] Checks to see if the user has selected a rating, won't submit form if they haven't
    if ( this.props.selectedRating ) {
      // [Refactor] Use Reacts native ref's method (avoid expensive DOM traversal)
      console.log('user has submitted a review with a rating of ', this.props.selectedRating);
      actions.reviewFormSubmitted(this.props.reviewId, $('#reviewBoxText').val(), this.props.selectedRating);
    } else {
      // [Refactor] Think of a better way of notifying the user
      alert('Please select a user rating');
    }
  },

  render: function(){
    //creates component for each message and loads them into the array messageGroup
    // var url = "/api/messages/samin"+ "/" + this.props.to + ""
    return (
    <div>
    <form className="reviewBox" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input type="number" min="1" max="5" step="1" id="reviewRating" name="reviewRating" />
        <textarea className="form-control" id="reviewBoxText" rows="3" placeholder="Review Your Lender" name="review"></textarea>
      </div>
      <button type="submit" className="btn btn-warning" onClick={this.handleSubmit}>Submit</button>
    </form>
    </div>
    )
  }
});

module.exports = ReviewBox;