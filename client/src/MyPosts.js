import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'

class MyPosts extends Component {
	constructor() {
		super()
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	}

	componentDidMount() {
		services.getAllMyPosts().then(post => {
			console.log(post,'hehe')
			this.setState({
				apiDataLoaded: true,
				apiData: post.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}

	renderPosts() {
		return this.state.apiData.map((el,i) => {
			console.log('eejflem',el)
			return <Post key={el.id} post={el} list='myposts'/>
		})
	}

	render() {
		return (
			<div className='mypostlist'>
				<Header />
				<h1>My Posts</h1>
				{this.state.apiDataLoaded ? this.renderPosts() : ''}
				<Footer />
			</div>
		)
	}
}

export default MyPosts
