//LetsGetit

import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'

class Likes extends Component {
	constructor() {
		super()
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	}

	componentDidMount() {
		services.getAllLikes().then(like => {
			this.setState({
				apiDataLoaded: true,
				apiData: like.data.data.posts
			})
		}).catch(err => {
			console.log(err)
		})
	}

	renderLikes() {
		return this.state.apiData.map((el,i) => {
			return <Post key={el.id} post={el} list='favs'/>
		})
	}

  	render(){
        return (
      		<div>
      			<Header />
      			<h1>Liked Posts</h1>
    			{this.state.apiDataLoaded ? this.renderLikes() : ''}
      			<Footer />
      		</div>
    	)
  	}
}

export default Likes
