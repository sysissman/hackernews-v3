import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './FaqList'
import { LINKS_PER_PAGE } from '../constants'
const POST_MUTATION = gql`
  mutation FaqMutation($description: String!, $url: String!, $tag: String) {
    faq(description: $description, url: $url, tag: $tag) {
      id
      createdAt
      url
      tag
      description
    }
  }
`

class CreateFaq extends Component {
  state = {
    description: '',
    url: '',
    tag: '',
  }

  render() {
    const { description, url, tag } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the FAQ"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the FAQ"
          />
          <input
            className="mb2"
            value={tag}
            onChange={e => this.setState({ tag: e.target.value })}
            type="text"
            placeholder="fun"
          />
        </div>

        <Mutation
  mutation={POST_MUTATION}
  variables={{ description, url, tag }}
  onCompleted={() => this.props.history.push('/faqs')}
  update={(store, { data: { post } }) => {
    const first = LINKS_PER_PAGE
    const skip = 0
    const orderBy = 'createdAt_DESC'
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    })
    data.feed.faqs.unshift(post)
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: { first, skip, orderBy }
    })
  }}
>
  {postMutation => <button onClick={postMutation}>Submit</button>}
</Mutation>


      </div>
    )
  }
}

export default CreateFaq 