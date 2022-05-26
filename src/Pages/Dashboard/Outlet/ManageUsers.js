import React, { useState } from 'react';
import { Badge, Dropdown, DropdownButton, InputGroup, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import ConfirmModal from '../../../Components/Shared/CustomModal/ConfirmModal';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { useMessage } from '../../../Hooks/useMessage';
import UserDetailModal from '../Modal/UserDetailModal';

const ManageUsers = () => {
   const [adminConfirm, setAdminConfirm] = useState(false);
   const [userDetailModal, setUserDetailModal] = useState(false);
   const { msg, setMessage } = useMessage();

   const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`https://manufacture-web.herokuapp.com/users`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   // make admin handler
   const makeAdminHandler = async (userEmail) => {
      const response = await fetch(`https://manufacture-web.herokuapp.com/user/admin/${userEmail}`, {
         method: "PUT",
         headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
      });

      if (response.status === 403) {
         setMessage(<p className='text-danger'>Admin request failed.</p>);
      } else {
         const data = await response.json();
         if (data.modifiedCount > 0) {
            refetch();
            setMessage(<p className='text-success'>Admin request successful.</p>);
            setAdminConfirm(false);
         }
      }
   }

   let serial = 0;

   return (
      <div className='section_default'>
         <div className="container">
            <h3 className="section_title">Manage All Users</h3>
            <p>Total : {users.length} Users.</p>
            <div className="row">
               <div className="col-12">
                  {msg}
                  <Table striped responsive>
                     <thead>
                        <tr>
                           <th>Serial</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Role</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           users && users.map((user) => {
                              const { _id, role, username, email } = user;
                              return (
                                 <tr key={_id}>
                                    <td>{++serial}</td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>
                                       {
                                          role === 'admin'
                                             ? <Badge className='bg-success'>Admin</Badge>
                                             : <>
                                                <Badge title='Want to make admin' onClick={() => setAdminConfirm(true && email)} style={{ cursor: "pointer" }}>
                                                   Make Admin
                                                </Badge>
                                             </>
                                       }
                                    </td>
                                    <td>
                                       <InputGroup className="mb-3">
                                          <DropdownButton
                                             title=''
                                             variant="outline-secondary"
                                             id="input-group-dropdown-1"
                                          >
                                             <Dropdown.Item onClick={() => setUserDetailModal(true && user)}>Profile</Dropdown.Item>
                                          </DropdownButton>
                                       </InputGroup>
                                    </td>
                                 </tr>
                              )
                           })
                        }
                     </tbody>
                     <ConfirmModal
                        okConfirm={makeAdminHandler}
                        cancelConfirm={() => setAdminConfirm(false)}
                        confirmShow={adminConfirm}
                        message={`Are you sure for give admin permission to "${adminConfirm}"`}
                     />

                     <UserDetailModal
                        profile={userDetailModal}
                        handleClose={() => setUserDetailModal(false)}
                     />
                  </Table>

               </div>
            </div>
         </div>
      </div>
   );
};

export default ManageUsers;