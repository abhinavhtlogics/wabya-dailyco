import Link from 'next/link'
import { useEffect,useState } from 'react'

import { useRouter } from 'next/router'
import { app,database } from '../../../firebaseConfig'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
} from "firebase/firestore";


const ClientsBasic = () => {

  const router = useRouter()
  const clientRef = collection(database, "client_user");
  const [client, setClient] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')
console.log('abc');


    if(!token){
        router.push('/pages/login')
    }else{
      getClients();
      console.log(client);
    }
}, [])

useEffect(() => {

    console.log(client);

}, [client])


const getClients = async () => {
  const queryDoc = query(clientRef, where("assign_coach_id", "==",  sessionStorage.getItem('coachId')));

    await getDocs(queryDoc).then((response) => {
      setClient(
        response.docs.map((data) => {
          return { ...data.data(), client_id: data.id };
        })
      );
    });
}

  return (
    <section className='clients-listing'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 filter-coll'>
            <div className='client-filter'>
              <div className='dropdown'>
                <div className='inner'>
                  <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Filter Clients
                  </button>
                  <ul className='dropdown-menu'>
                    <div className='form-check'>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          All
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Active
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Inactive
                        </label>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className='row'>
          {!client ? null :client.map((cl, index) => {
                      return (

          <div className='col-sm-3 cl-coll'>
            <Link href={`${router.basePath}/clientDetail/${cl.client_id}`} passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  {cl.client_name} <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>

           );
          })}
           </div>
          {/* <!--/ cl-coll --> */}

        </div>
        {/* <!--/ row --> */}

    </section> // client-listing
  )
}

export default ClientsBasic
