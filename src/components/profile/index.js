import React from "react";
import { gql } from "@apollo/client";
import RepositoryList from "../repository/repositoryList";
import Loading from "../loading";
import ErrorMessage from "../error";
import { graphql } from "@apollo/client/react/hoc";
import { REPOSITORY_FRAGMENT } from "../repository";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

const Profile = ({ loading, error, data }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { viewer } = data;

  if (loading || !viewer) {
    return <Loading />;
  }

  return <RepositoryList repositories={viewer.repositories} />;
};

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
