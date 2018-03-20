//Lillian
import React, {Component} from 'react'
import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'

class Feed extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='feed'>
				<Header />
				<PostList />
				<Footer />
			</div>
		)
	}
}

export default Feed