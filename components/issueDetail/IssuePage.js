import React from 'react';
import IssueTimeline from './IssueTimeline';
import IssueHeader from './IssueHeader';
import DetailSidebar from './DetailSidebar';

class IssuePage extends React.Component {

  componentDidMount() {
    const { owner, repo, issueId, getIssue } = this.props;
    getIssue(owner, repo, issueId);
  }

  componentDidUpdate(prevProps) {
    const { issue, getComments } = this.props;
    if(prevProps.issue !== issue) {
      getComments(issue);
    }
  }

  render() {

    const { issueId, issue, comments, issueError, commentsError } = this.props;

    if(!issue)
      return null;

    if(issueError) {
      return (
        <div className="issue-detail--error">
          <h1>There was a problem loading issue #{issueId}</h1>
          <p>{issueError.toString()}</p>
        </div>
      );
    }

    if(commentsError) {
      return (
        <div className="issue-detail--comments-error">
          There was a problem fetching the comments.
        </div>
      );
    }

    return (
      <div className="container px-0 mt-3">
        <IssueHeader
          title={issue.title}
          number={issue.number}
          isOpen={issue.state === "open"}
          timeStamp={issue.created_at}
          comments={issue.comments}
          user={issue.user} />

        <div className="row">
          <div className="col-9 discussion-timeline">
            <IssueTimeline
              post={issue}
              comments={comments} />
          </div>

          <div className="col-3">
            <DetailSidebar
              assignees={issue.assignees}
              labels={issue.labels}
              milestone={issue.milestone} />
          </div>
        </div>
      </div>
    );
  }
}

export default IssuePage;