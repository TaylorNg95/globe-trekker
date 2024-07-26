import React from 'react'

function ProgressBar({progress, total}) {
  return (
    <div>Progress: {progress} miles || {total} total || {(progress / total * 100).toFixed(1)}% complete</div>
  )
}

export default ProgressBar