import React from 'react';
import IssuesSearchForm from './IssuesSearch';
import IssueTable from './IssueTable'
import Pagination from '../Pagination'
import { getPageFromQuery, getSearchStrFromQuery } from '../../utils/urlUtils';

class IssueTab extends React.Component {

  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
  }

  componentDidMount() {
    const { getIssues, owner, repo, location } = this.props;
    const computedPage = getPageFromQuery(location.search);
    const currentPageBaseOne = computedPage ? computedPage : 1;
    const currentSearchStr = getSearchStrFromQuery(location.search);

    getIssues(owner, repo, currentSearchStr, currentPageBaseOne);
  }

  componentDidUpdate(prevProps) {
    const { getIssues, owner, repo, location } = this.props;


    if(prevProps.location.search !== location.search) {
      const newPage = getPageFromQuery(location.search);
      const newSearchStr = getSearchStrFromQuery(location.search);
      getIssues(owner, repo, newSearchStr, newPage);
    }
  }

  handlePageChange({ selected }) {


    const currentPageOneBased = selected + 1;
    const { history, location } = this.props;
    const currentSearchStr = getSearchStrFromQuery(location.search);

    const urlQueryStr = `?page=${currentPageOneBased}` + (currentSearchStr ? 
                        `&q=${currentSearchStr}` : "");

    history.push(urlQueryStr);
  }


  handleSearchFormSubmit(searchStr) {
    const {history } = this.props;
    history.push(`?q=${searchStr}`);
  }

  render() {

    const {
      owner, repo, issues,
      pageCount, issuesError,
      location
    } = this.props;

    if (issuesError) {
      return (
        <div>
          <h1>Something went wrong...</h1>
          <div>{issuesError.toString()}</div>
        </div>
      );
    }

    const computedPage = getPageFromQuery(location.search);
    const currentPageBaseOne = computedPage ? computedPage : 1;
    const computedSearchStr = getSearchStrFromQuery(location.search);
    const initialSearchStr = computedSearchStr ? computedSearchStr : "is:issue is:open";

    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-6">
            <IssuesSearchForm 
              initialSearchStr={initialSearchStr} 
              handleSearchFormSubmit={this.handleSearchFormSubmit} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <IssueTable issues={issues} owner={owner} repo={repo} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <Pagination
              currentPage={currentPageBaseOne - 1}
              pageCount={pageCount}
              handlePageChange={this.handlePageChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default IssueTab;