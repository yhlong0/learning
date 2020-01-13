import { Droppable } from 'react-beautiful-dnd'
import NodeList from './NodeList'
import React from 'react'
import { withStyles } from '@material-ui/core'

const Column = props => {
  const { classes, column, nodes } = props

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{column.id}</h3>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <div
            className={classes.nodeList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {nodes.map((node, index) => (
              <NodeList index={index} key={node.id} node={node} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

const styles = theme => ({
  container: {
    margin: '8px',
    border: '1px solid lightgrey',
    borderRadius: '2px',
    width: '50%',
  },
  title: {
    padding: '8px',
  },
  nodeList: {
    padding: '8px',
  },
})

export default withStyles(styles)(Column)
