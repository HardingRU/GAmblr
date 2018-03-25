import React, {Component} from 'react'
import services from './services/apiServices'
import Post from './Post'
import Header from './Header'
import Footer from './Footer'

class UserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      userDataLoaded: false,
      postDataLoaded: false,
      userData: null,
      postData: null,
      fireRedirect: false
    }
  }

  componentDidMount() {
      console.log("giddy up",this.props.match)
      services.getUser(this.props.match.params.username).then(user => {
        console.log('userdata',user)
        this.setState({
          userDataLoaded: true,
          userData: user.data.data.user
        })
      }).catch(err => {
        console.log(err)
      })
      services.getUserPage(this.props.match.params.username).then(data => {
        console.log(data,'userpagestuff')
        this.setState({
          postDataLoaded: true,
          postData: data.data.data.info
        })
      }).catch(err => {
        console.log(err)
      }) 
  }

  renderPage() {
    return (
      <div>
        <img className='user-background' alt='' src='#' />
        <img className='user-pic' alt='' src={this.state.userData.pic} />
        <h1>{this.state.userData.blog_name}</h1>
        <h2>{this.state.userData.blog_desc}</h2>
        {this.state.postData.map((el,i) => {
          console.log('singleuser',el)
          return <Post key={el.id} post={el} list='userposts' />
        })}
      </div>
    )
  }



  render(){
    return (
      <div>
        <Header />
        {this.state.userDataLoaded && this.state.postDataLoaded ? this.renderPage() : ''}
        <Footer />
      </div>
    )
  }
}

export default UserPage
