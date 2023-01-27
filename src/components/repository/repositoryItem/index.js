import React from "react";
import Link from "../../link";
import Button from "../../button";
import {
  WATCH_REPOSITORY,
  UNSTAR_REPOSITORY,
  STAR_REPOSITORY,
} from "../mutations";
import { Mutation } from "@apollo/client/react/components";

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: "SUBSCRIBED",
  UNSUBSCRIBED: "UNSUBSCRIBED",
};

const isWatch = (viewerSubscription) =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => {
  return (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>

        <div>
          <Mutation
            mutation={WATCH_REPOSITORY}
            variables={{
              id,
              viewerSubscription: isWatch(viewerSubscription)
                ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
            }}
          >
            {(updateSubscription, { data, loading, error }) => (
              <Button
                className="RepositoryItem-title-action"
                data-test-id="updateSubscription"
                onClick={updateSubscription}
              >
                {watchers.totalCount}{" "}
                {isWatch(viewerSubscription) ? "Unwatch" : "Watch"}
              </Button>
            )}
          </Mutation>
          {!viewerHasStarred ? (
            <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
              {(addStar, { data, loading, error }) => (
                <Button
                  className={"RepositoryItem-title-action"}
                  onClick={addStar}
                >
                  {stargazers.totalCount} Star
                </Button>
              )}
            </Mutation>
          ) : (
            <Mutation mutation={UNSTAR_REPOSITORY} variables={{ id }}>
              {(removeStar, { data, loading, error }) => (
                <Button
                  className={"RepositoryItem-title-action"}
                  onClick={removeStar}
                >
                  {stargazers.totalCount} Unstar
                </Button>
              )}
            </Mutation>
          )}

          {/* Your updateSubscription mutation*/}
        </div>
      </div>

      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem;
