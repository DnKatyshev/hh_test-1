// dnd-kit
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
  } from '@dnd-kit/core';
  import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
  } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';


// mui
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { HandGrabbing } from '@phosphor-icons/react';

// react
import React from 'react';
import { useState, useMemo, useCallback } from 'react';
import useDataStore from '@/store/dataStore';
  

const SortableRow = React.forwardRef(({ id, row, columns, selectable }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({ id });
  
    const { actionCheckboxes, setActionCheckboxes } = useDataStore();
  
    const combinedRef = useCallback((node) => {
      setNodeRef(node);
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    }, [ref, setNodeRef]);
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 100 : 'auto'
    };
  
    return (
      <TableRow
        ref={combinedRef}
        style={style}
        hover
      >
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={actionCheckboxes.includes(id)}
              onChange={(e) => {
                e.stopPropagation();
                setActionCheckboxes(id);
              }}
              inputProps={{ 'aria-label': 'select row' }}
            />
          </TableCell>
        )}
  
        <TableCell padding="checkbox" {...attributes}>
          <IconButton {...listeners}>
            <HandGrabbing size={20}/>
          </IconButton>
        </TableCell>
  
        {columns.map((column) => (
          <TableCell
            key={`${id}-${column.name}`}
            align={column.align || 'left'}
          >
            {column.formatter ? column.formatter(row) : row[column.field]}
          </TableCell>
        ))}
      </TableRow>
    );
});
  


export function arrayMove(array, from, to) {
  const newArray = [...array];
  newArray.splice(to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}



export function SortableTable({ columns, rows, selectable, lastRowRef }) {
const { sortOrder, setSortOrder } = useDataStore();
const [activeId, setActiveId] = useState(null);


// Применяем сортировку если она есть
const sortedRows = useMemo(() => {
    if (!sortOrder || sortOrder.length !== rows.length) return rows;
    
    return sortOrder.map(id => rows.find(row => (row.id || row._id) === id)).filter(Boolean);
}, [rows, sortOrder]);


const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
    })
);

const handleDragStart = (event) => {
    setActiveId(event.active.id);
};


const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id) return;
    
    const oldIndex = sortedRows.findIndex(row => (row.id || row._id) === active.id);
    const newIndex = sortedRows.findIndex(row => (row.id || row._id) === over.id);
    
    if (oldIndex === -1 || newIndex === -1) return;
    
    const newOrder = arrayMove(
      sortedRows.map(row => row.id || row._id),
      oldIndex,
      newIndex
    );
    
    setSortOrder(newOrder);
    setActiveId(null);
};

return (
    <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    >
    <SortableContext 
        items={sortedRows.map(row => row.id || row._id)}
        strategy={verticalListSortingStrategy}
    >
        <Table>
        <TableBody>
            {sortedRows.map((row, index) => {
            const isLastRow = index === sortedRows.length - 1;
            const rowId = row.id || row._id || index;
            
            return (
                <SortableRow
                key={rowId}
                id={rowId}
                row={row}
                columns={columns}
                selectable={selectable}
                ref={isLastRow ? lastRowRef : null}
                />
            );
            })}
        </TableBody>
        </Table>
    </SortableContext>
    
    <DragOverlay>
        {activeId ? (
        <TableRow style={{
            background: 'rgba(0,0,0,0.1)',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}>
            {columns.map(column => (
              <TableCell key={`${activeId}-${column.name}`}>
                  {sortedRows.find(r => (r.id || r._id) === activeId)?.[column.field]}
              </TableCell>
            ))}
        </TableRow>
        ) : null}
    </DragOverlay>
    </DndContext>
);
}