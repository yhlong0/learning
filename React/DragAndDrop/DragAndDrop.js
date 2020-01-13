import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import React from 'react'
import { withStyles } from '@material-ui/core'

const initialData = {
  nodes: {
    node1: { nodeName: 'node1', content: 'hihi' },
    node2: { nodeName: 'node2', content: 'hihi2' },
    node3: { nodeName: 'node3', content: 'hihi3' },
    node4: { nodeName: 'node4', content: 'hihi4' },
  },
  columns: {
    source: { id: 'source', nodes: ['node1', 'node2', 'node3', 'node4'] },
    target: { id: 'target', nodes: [] },
  },
  columnOrder: ['source', 'target'],
}

const DndNodes = props => {
  const { classes } = props

  const columns = initialData.columnOrder.map(columnId => {
    const column = initialData.columns[columnId]
    const nodes = column.nodes.map(nodeId => initialData.nodes[nodeId])

    return <Column key={column.id} column={column} nodes={nodes} />
  })

  const onDragEnd = result => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.container}>{columns}</div>
    </DragDropContext>
  )
}

const styles = theme => ({
  container: {
    display: 'flex',
    direction: 'column',
  },
})

export default withStyles(styles)(DndNodes)
