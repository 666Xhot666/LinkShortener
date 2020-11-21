import React from 'react'

export const LinkCard = ({ link }) => {

  return (
      <div className="row">
      <div  className="col s9 offset-s1 center-align">
        <h1> Link</h1>
        <div className="card indigo darken-4">
          <div className="card-content white-text">
            <span className="card-title z-depth-3 center-align">Short Link</span>
            <span className="card-title center-align"><a href={link.to} target="_blank" rel="noopener noreferrer"> {link.to}</a></span>
          </div>
        </div>
        <div className="card indigo darken-4">
          <div className="card-content white-text">
            <span className="card-title z-depth-3 center-align">Original Link</span>
            <span className="card-title center-align"><a href={link.from} target="_blank" rel="noopener noreferrer"> {link.from}</a></span>
          </div>
        </div>
        <div className="card  indigo darken-4">
          <div className="card-content white-text">
            <span className="card-title z-depth-3 center-align">Clicks of Short Link</span>
            <span className="card-title center-align"><strong>{link.clicks}</strong></span>
          </div>
        </div>
        <div className="card  indigo darken-4">
          <div className="card-content white-text">
            <span className="card-title z-depth-3 center-align">Date of Create</span>
            <span className="card-title center-align"><strong>{new Date(link.date).toLocaleDateString()}</strong></span>
          </div>
        </div>
      </div>
      </div>
  )
}
