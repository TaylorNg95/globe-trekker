import React from 'react'

function ProgressBar({progress, total}) {
  let prog = progress
  if (prog > total){
    prog = total
  }
  // Account for if user inputs and entry that puts them over 100%

  return (
    <div>Progress: {progress} miles || {total} total || {(prog / total * 100).toFixed(1)}% complete</div>
  )
}

export default ProgressBar