import React from 'react';
import PropTypes from 'prop-types';
import { getTimeDiffFromNow } from '../../utils/timeUtils';

import issueOpenedIcon from '../../images/octicons/svg/issue-opened-white.svg';
import issueClosedIcon from '../../images/octicons/svg/issue-closed-white.svg';
import '../css/issueHeader.css';


const IssueHeader = ({ title, number, isOpen, timeStamp, comments, user }) => {
  let icon, issueStatusText, stateColorClass;
  if(isOpen){
    icon = issueOpenedIcon;
    issueStatusText = "Open";
    stateColorClass = "open-issue";
  } else {
    icon = issueClosedIcon;
    issueStatusText = "Closed";
    stateColorClass = "closed-issue";
  }

  const timeDiffStr = getTimeDiffFromNow(timeStamp);
  const singularOrPluralComment = comments <= 1 ? "comment" : "comments";

  return (
    <div className="issue-page-header">
      <div className="row">
        <div className="col">
          <h2>
            {title}&nbsp;
            <span className="text-muted">#{number}</span>
          </h2>
        </div>
      </div>

      <div className="row my-2 pb-3">
        <div className="col">
          <div className={`state ${stateColorClass}`}>
            <img className="align-baseline" src={icon} alt=""/>
            <span className="mx-1">{issueStatusText}</span>
          </div>
          <span className="text-secondary ml-2">
            <a href={`https://github.com/${user.login}`} 
               className="text-secondary font-weight-bold">{user.login}</a> 
               &nbsp;opened this issue&nbsp;
            <span>{timeDiffStr}</span>
            <span> · {comments}</span> {singularOrPluralComment}
        </span>
        </div>
      </div>
      <hr />
    </div>
  );
};

IssueHeader.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  timeStamp: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string
  }).isRequired
};

export default IssueHeader;

