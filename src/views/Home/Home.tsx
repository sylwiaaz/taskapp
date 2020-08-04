import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { addBoard, loadBoards } from 'store/actions/boardActions';
import './home.scss';
import { BoardItem } from 'components/BoardItem/BoardItem';
import { IBoard } from 'interfaces';


const Home: FunctionComponent<RouteComponentProps> = () => {

    const dispatch = useDispatch();
    const boards = useSelector((state: RootState) => state.boards);
    const userID = useSelector((state: RootState) => state.firebase.auth.uid);
    const [boardTitle, setBoardTitle] = useState<string>('');

    useEffect(() => {
        dispatch(loadBoards(userID));
    }, [dispatch, userID]);

    const boardsList = boards.map((board: IBoard) => {
        return <BoardItem id={board.id} title={board.boardTitle} key={board.id}/>;
    });

    const handleAddBoard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        dispatch(addBoard(userID, boardTitle));
        setBoardTitle('');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setBoardTitle(e.target.value);
    }

    return (
        <div className='boards-container'>
            <h3 className='pick-board'>Pick a board...</h3>
            <div className='boards-list'>
                {!!boardsList.length ? boardsList :
                    <p className='no-boards'>You don't have any boards. Add a new one below!</p>}
                <form className='add-board'>
                    <input className='add-field' placeholder='Board title..' value={boardTitle}
                           onChange={handleChange}/>
                    <button type='submit' className='add-btn' onClick={handleAddBoard}>Add</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
