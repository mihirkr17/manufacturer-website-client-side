import React from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Spinner from '../../../Components/Shared/Spinner/Spinner';

const ManageUsers = () => {
   const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/users`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   return (
      <div className='section_default'>
         <div className="container">
            <h2 className="text-center py-2">All Users</h2>
            <div className="row">
               <div className="col-12">
                  <Table striped>
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Username</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           users && users.map(user => {
                              return (
                                 <tr key={user._id}>
                                    <td>1</td>
                                    <td>{}</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                 </tr>
                              )
                           })
                        }
                        <tr>
                           <td>1</td>
                           <td>Mark</td>
                           <td>Otto</td>
                           <td>@mdo</td>
                        </tr>
                        <tr>
                           <td>2</td>
                           <td>Jacob</td>
                           <td>Thornton</td>
                           <td>@fat</td>
                        </tr>
                        <tr>
                           <td>3</td>
                           <td colSpan={2}>Larry the Bird</td>
                           <td>@twitter</td>
                        </tr>
                     </tbody>
                  </Table>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ManageUsers;