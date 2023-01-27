import React from "react";
import { gql, useQuery } from "@apollo/client";
import RepositoryList from "../repository/repositoryList";
import Loading from "../loading";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
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
  if (error) return `Error! ${error.message}`;

  return <RepositoryList repositories={data.viewer.repositories} />;
};

export default Profile;
