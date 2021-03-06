import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

function InterviewerList(props) {

  const {value, onChange} = props;

  const InterviewerListItems = props.interviewers.map(e => {
    return <InterviewerListItem key={e.id} name={e.name} avatar={e.avatar} selected={value === e.id} setInterviewer={() => onChange(e.id)} />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListItems}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;