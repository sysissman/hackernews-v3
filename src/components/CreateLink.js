import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './LinkList'
import { LINKS_PER_PAGE } from '../constants'
const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!, $tag: String!) {
    post(description: $description, url: $url, tag: $tag, tier: $tier) {
      id
      createdAt
      url
      tag
      tier
      description
    }
  }
`

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
    tag: '',
    tier: '',
  }

  render() {
    const { description, url, tag, tier } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
          <input
            className="mb2"
            value={tag}
            onChange={e => this.setState({ tag: e.target.value })}
            type="text"
            placeholder="The tag for the link"
          />
          <input
            className="mb2"
            value={tier}
            onChange={e => this.setState({ tier: e.target.value })}
            type="text"
            placeholder="The tier for the link. Choose from a, b, c, or d"
          />
        </div>
        <Mutation
  mutation={POST_MUTATION}
  variables={{ description, url, tag, tier }}
  onCompleted={() => this.props.history.push('/new/1')}
  update={(store, { data: { post } }) => {
    const first = LINKS_PER_PAGE
    const skip = 0
    const orderBy = 'createdAt_DESC'
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    })
    data.feed.links.unshift(post)
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

export default CreateLink