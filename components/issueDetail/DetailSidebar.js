import React from 'react';
import unmuteIcon from '../../images/octicons/svg/unmute.svg';
import '../css/button.css';
import '../css/issueLabel.css';
import '../css/issueSidebar.css';

const AssigneesSidebar = ({ assignees }) => {

  const assigneeRows = assignees.length ? (
    assignees.map(assignee => (
      <div className="row" key={assignee.id}>
        <div className="col">
          <a href={assignee.html_url}>
            <img width="20" height="20" src={assignee.avatar_url} alt="avatar" />
          </a>
          <a className="assignee link-gray-dark" href={assignee.html_url}>
            {assignee.login}
          </a>
        </div>
      </div>
    ))
  ) : (
      <div className="row">
        <div className="col">
          No one assigned
        </div>
      </div>
    );

  return (
    <div className="discussion-sidebar-item sidebar-assignee">
      <div className="row discussion-sidebar-heading">
        <div className="col">
          <span className="font-weight-bold">Assignees</span>
        </div>
      </div>

      {assigneeRows}
    </div>
  );
}

const LabelsSidebar = ({ labels }) => {

  const labelRows = labels.length ? (labels.map(label => (
    <div className="row mb-1" key={label.id}>
      <div className="col">
        <a className="issue-label w-100"
          style={{ backgroundColor: `#${label.color}`, color: "#000000" }}
          href={label.url}>
          {label.name}
        </a>
      </div>
    </div>
  ))) : (
      <div className="row">
        <div className="col">
          None yet
        </div>
      </div>
    );

  return (
    <div className="discussion-sidebar-item sidebar-labels">
      <div className="row discussion-sidebar-heading">
        <div className="col">
          <span className="font-weight-bold">Labels</span>
        </div>
      </div>

      {labelRows}
    </div>
  );
}

const ProjectsSidebar = (props) => {
  return (
    <div className="discussion-sidebar-item sidebar-projects">
      <div className="row discussion-sidebar-heading ">
        <div className="col">
          <span className="font-weight-bold">Projects</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          None yet
        </div>
      </div>
    </div>
  );
}

const MilestoneSidebar = ({ milestone }) => {
  let progressPercent;
  if (milestone) {
    progressPercent =
      (milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100;
  }
  const milestoneRow = milestone ? (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <span className="progress">
            <span className="progress-bar bg-success" style={{ width: `${progressPercent}%` }}></span>
          </span>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <a className="link-gray-dark" href={milestone.url}>{milestone.title}</a>
        </div>
      </div>
    </React.Fragment>
  ) : (
      <div className="row">
        <div className="col">
          None yet
        </div>
      </div>
    );

  return (
    <div className="discussion-sidebar-item sidebar-milestone">
      <div className="row discussion-sidebar-heading">
        <div className="col">
          <span className="font-weight-bold">Milestone</span>
        </div>
      </div>

      {milestoneRow}
    </div>
  );
}

const NotificationSidebar = () => {
  return (
    <div className="discussion-sidebar-item sidebar-milestones">
      <div className="row discussion-sidebar-heading ">
        <div className="col">
          <span className="font-weight-bold">Notifications</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-sm w-100">
            <img src={unmuteIcon} /> Subscribe
          </button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          You’re not receiving notifications from this thread.
        </div>
      </div>
    </div>
  );
}

const DetailSidebar = ({ assignees, labels, milestone }) => {
  return (
    <div className="discussion-sidebar mt-4">
      <AssigneesSidebar assignees={assignees} />
      <hr />
      <LabelsSidebar labels={labels} />
      <hr />
      <ProjectsSidebar />
      <hr />
      <MilestoneSidebar milestone={milestone} />
      <hr />
      <NotificationSidebar />
    </div>
  );
}

export default DetailSidebar;