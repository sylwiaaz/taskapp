import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { removeBoard } from 'store/actions/boardActions';

export const BoardItem: FunctionComponent<{ title: string, id: string }> = ({ title, id }) => {
    const dispatch = useDispatch();

    const handleClick = (): void => {
        dispatch(removeBoard(id));
    }

    return (
        <div className='board-item'>
            <Link to={`board/${id}`}>{title}</Link>
            <button className='remove-btn'><CloseIcon className="icon" onClick={handleClick}/></button>
        </div>
    );
};
