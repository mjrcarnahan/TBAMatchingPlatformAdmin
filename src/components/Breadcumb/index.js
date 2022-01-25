import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineChevronRight } from 'react-icons/hi'
import './index.css'
import { Router } from '../../router'

const Breadcrumb = ({ type_id = 1 }) => {
  return (
    <div className="breadcrumb">
      <Link className="p-0" to={`${type_id === 1 ? Router.admin.ip : Router.admin.surrogates}`}>
        {type_id === 1 ? 'Intented Parents' : 'Surrogates'}
      </Link>
      <HiOutlineChevronRight />
      <p>Hola</p>
    </div>
  )
}

export default Breadcrumb
