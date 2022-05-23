import React, { useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import ConfirmModal from '../../../Components/Shared/CustomModal/ConfirmModal';
import Spinner from '../../../Components/Shared/Spinner/Spinner';

const ManageUsers = () => {
   const [cnf, setCnf] = useState(false);
   // const [msg, setMsg] = useState('');

   const handleClose = () => setCnf(false);
   const handleShow = () => setCnf(true);

   const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/users`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   // make admin handler
   const makeAdminHandler = async (userEmail) => {

      const response = await fetch(`http://localhost:5000/user/admin/${userEmail}`, {
         method: "PUT",
         headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      });

      // if (response.ok) {
         const data = await response.json();

         if (data) {
            console.log(data);
            refetch();
         }
      // }

   }

   return (
      <div className='section_default'>


         <div className="container">
            <h2 className="text-center py-2">All Users</h2>
            <div className="row">
               <div className="col-12">
                  <Table striped responsive>
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           users && users.map((user, index) => {
                              const { _id, role, email } = user;
                              return (
                                 <>
                                    <tr key={_id}>
                                       <td>1</td>
                                       <td>{user.name}</td>
                                       <td>{email}</td>
                                       <td>
                                          {
                                             role === 'admin'
                                                ? <Badge>Admin</Badge>
                                                : <Badge title='Want to make admin' onClick={handleShow} style={{ cursor: "pointer" }}>
                                                   Make Admin
                                                </Badge>
                                          }
                                       </td>
                                    </tr>
                                    <ConfirmModal
                                       key={index}
                                       okConfirm={makeAdminHandler}
                                       cancelConfirm={handleClose}
                                       confirmShow={cnf}
                                       message={"hsdffygsy"}
                                       data={email}
                                    />
                                 </>
                              )
                           })
                        }
                     </tbody>
                  </Table>

               </div>
            </div>
         </div>
      </div>
   );
};

export default ManageUsers;