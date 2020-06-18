import React, { FunctionComponent, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { loadBoards } from 'store/actions/boardActions';
import './home.scss';
import { MdClose } from 'react-icons/md';


// const boards = [
//    {
//       id: '4q6zLNmCqXyTtE3RPOvk',
//       authorID: 'id',
//       boardTitle: 'To do list',
//       columns: [
//          {
//             id: '2A7GNepj5YRizJsBczTI',
//             columnID: 'column-0',
//             name: 'Done',
//             boardID: '4q6zLNmCqXyTtE3RPOvk',
//             notes: []
//          }
//       ]
//    },
//    {
//       id: 'I6ounmGoBCS3oxi5wweQ',
//       authorID: 'id',
//       boardTitle: 'shopping list',
//       columns: [
//          {
//             id: '2A7GNepj5YRizJsBczTI',
//             columnID: 'column-0',
//             name: 'to buy',
//             boardID: 'I6ounmGoBCS3oxi5wweQ',
//             notes: []
//          }
//       ]
//    }
// ];


export const BoardItem: FunctionComponent<{ title: string, id: string }> = ({ title, id }) => {
   return (
      <div className='board-item'>
         <Link to={`board/${id}`}>{title}</Link>
         <button className='remove-btn'><MdClose className="icon"/></button>
      </div>
   );
};

export const Home: FunctionComponent<RouteComponentProps> = (props) => {

   const dispatch = useDispatch();
   const boards = useSelector((state: RootState) => state.board);
   const userID = useSelector((state: any) => state.firebase.auth.uid);

   useEffect(() => {
      dispatch(loadBoards('4q6zLNmCqXyTtE3RPOvk', userID));
   }, [dispatch, userID]);

   const boardsList = boards.map((board: any) => {
      return <BoardItem id={board.id} title={board.boardTitle} key={board.id}/>;
   });

   return (
      <div className='boards-container'>
         <h3 className='pick-board'>Pick a board...</h3>
         <div className='boards-list'>
            {boardsList}
            <form className='add-board'>
               <input className='add-field' placeholder='Add a new board'/>
               <button type='submit' className='add-btn'>Add</button>
            </form>
         </div>

      </div>
   );
};