import { Draggable } from 'react-beautiful-dnd'
import React from 'react'
import { withStyles } from '@material-ui/core'

const NodeList = props => {
  const { classes, index, node } = props
  return (
    <Draggable draggableId={node.nodeName} index={index}>
      {provided => (
        <div
          className={classes.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {node.nodeName}
        </div>
      )}
    </Draggable>
  )
}

const styles = theme => ({
  container: {
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '2px',
    margin: '8px',
    padding: '8px',
  },
})

export default withStyles(styles)(NodeList)
