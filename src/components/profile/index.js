import React from "react";
import { gql, useQuery } from "@apollo/client";
import RepositoryList from "../repository/repositoryList";
import Loading from "../loading";
import ErrorMessage from "../error";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DC, field: STARGAZERS }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES_OF_CURRENT_USER);

  if (loading || !data) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <RepositoryList repositories={data.viewer.repositories} />;
};

export default Profile;
