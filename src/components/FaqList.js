
import React from 'react'
import Faq from './Faq'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
        faqs {
          id
          url
          description
          postedBy {
            name
          }
        }
    }
  }
`;

const getLinksToRender = (data) => {
  return data.feed.faqs;
};

const FaqList = () => {
  const {
    data,
    loading,
    error,
  } = useQuery(FEED_QUERY);


  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(data).map(
            (faq, index) => (
              <Faq
                key={faq.id}
                faq={faq}
                index={index}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default FaqList; 