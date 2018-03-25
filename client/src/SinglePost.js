import React, {Component} from 'react'
import services from './services/apiServices'
import Header from './Header'
import Footer from './Footer'
import Post from './Post'

class SinglePost extends Component {
  constructor(props){
    super(props)
    this.state = {
      postDataLoaded: false,
      postData: null,
      fireRedirect: false,
      commentData: null,
      commentDataLoaded: false,
      comment: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    services.singlePost(this.props.match.params.id)
    .then(data => {
      this.setState({
        postDataLoaded: true,
        postData: data.data.data.post[0]
      })
      services.getComments(this.props.match.params.id)
      .then(comments => {
        this.setState({
          commentDataLoaded: true,
          commentData: comments.data.data.comments
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderComments() {
    return this.state.commentData.map((el,i) => {
      let link = "/user/" + el.user_name
      return (
        <div>
        <p><img src={el.pic} alt="Pic"/><a href={link}>{el.user_name}</a> {el.comment}</p>
      </div>
      )
    })
  }


  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    services.addComment(this.props.match.params.id, this.state.comment)
    .then(comment => {
      this.getData()
    })
    .catch(err => {
      console.log(err)
    })

  }

  renderPage() {

          return (
            <div>
              <Post post={this.state.postData} list='singlepost' />
              <p>Add Comment:</p>
              <form onSubmit={this.handleFormSubmit}>
                <textarea name="comment" onChange={this.handleInputChange} placeholder="Enter Comment"></textarea>
                <input type="submit"></input>
              </form>

              <p>Comments:</p>
              {this.state.commentDataLoaded ? this.renderComments() : ''}
            </div>
          )
	}



  render(){
    return (
      <div>
        <Header />
        {this.state.postDataLoaded ? this.renderPage() : ''}
        <Footer />
      </div>
    )
  }
}

export default SinglePost
