import React from 'react'
import {useParams} from 'react-router';
import Add from './Add';

const Update = () => {

    const {id} = useParams();
  return (
      <Add isUpdateFlow id={id} />
  )
}

export default Update