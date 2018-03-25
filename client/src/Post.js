//Lillian
import React, {Component} from 'react'
import services from './services/apiServices'
import {Button} from 'react-bootstrap'
import ReactPlayer from 'react-player'
import './index.css';

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likeClicked: false,
		//	user_id: (props.list === 'favs' || props.list === 'userposts') ? props.post.user_id : props.post.user_id,
			user_id: 1,
			post_id: props.list === 'favs' ? props.post.post_id : props.post.postid,
			fireRedirect: false,
			likes: parseInt(props.post.notes)
		}
	}


	componentDidMount() {
		services.checkLikes(this.state.user_id, this.state.post_id).then(posts => {
					console.log("inside mount, like found")
					this.setState({
							likeClicked: true
					})
					console.log(this.state.likeClicked)
				}).catch(err => {
						this.setState({
							likeClicked: false
						})
					console.log(err)
				})
				console.log(this.state.user_id)
				console.log("props follower", this.props.post.follower_id)
	}

	addLike() {
		services.addLike(this.state).then(like => {
			this.setState({
				likeClicked: true,
			})
		}).catch(err => {
			console.log(err)
		})
		services.getPost(this.state.post_id).then(post => {
			this.setState({
				likes: post.data.data.post.notes
			})
		})
	}

	removeLike() {
		console.log("removing like", this.state.user_id)
		services.removeLike(this.state.post_id,this.state.user_id).then(like => {
			this.setState({
				likeClicked: false,
			})
			services.subtractLike(this.state.post_id).then(like2 => {
			})
			.catch(err=> {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})
		services.getPost(this.state.post_id).then(post => {
			this.setState({
				likes: post.data.data.post.notes
			})
		})
	}

	render() {
		let link = "/post/" + this.state.post_id
		return (
			<div className='post mainPost'>
				<img className="profilePic" alt='' src={this.props.post.pic} />
				<h2 className="userPost" className='post'><a className="userLink" href={`/user/${this.props.post.user_name}`}>{this.props.post.user_name}</a></h2>
				<div className="posts">{this.props.post.type === 'video' ? <ReactPlayer url={this.props.post.content} /> : this.props.post.type === 'photo' ? <img alt='' src={this.props.post.content} /> : this.props.post.type === 'link' ? <a href={this.props.post.content}>{this.props.post.content}</a> : this.props.post.content}</div>
				<br/>
				{this.props.list !== 'myposts' ? <Button className="rightAdj" className="like" className="btn btn-danger" bsStyle="info" onClick={this.state.likeClicked ? this.removeLike.bind(this) : this.addLike.bind(this)}>{this.state.likeClicked ? 'Unlike' : 'Like'}</Button> : ''}
				<p className="rightAdj likes">Likes: {this.state.likes}</p>
				<p className="leftAdj viewPost"><a href={link}>View Post</a></p>
				<br/>
				<br/>


			</div>
		)
	}
}
export default Post
