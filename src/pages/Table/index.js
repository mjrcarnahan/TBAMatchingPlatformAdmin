import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { AiOutlineEye } from 'react-icons/ai'

import Header from '../../components/Header'
import Loading from '../../components/Loading/'

import './index.css'
import { GET } from '../../utils/crud'

const Table = (history) => {
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const columns = [
    { name: 'Full Name', selector: 'full_name', sortable: true, width: '250px' },
    { name: 'Spouse', selector: 'spouse', sortable: true },
    { name: 'Age', selector: 'age', sortable: true },
    { name: 'Member Since', selector: 'member_since', sortable: true },
    { name: 'Payment', selector: 'payment', sortable: true },
    { name: 'Sex', selector: 'sex', sortable: false },
    { name: 'Status', selector: 'status', sortable: true },

    {
      name: 'Detail',
      center: true,
      cell: (row) => (
        <Link to={`${history?.match?.url}/${row.id}`} className="btn-link">
          <AiOutlineEye />
        </Link>
      ),
      width: '80px'
    }
  ]

  const [filter, setFilter] = useState('')
  useEffect(() => {
    let title = ''
    let url = ''
    if (history?.match?.url === '/admin/surrogates') {
      title = 'Surrogates'
      url = 'surrogates'
    } else {
      title = 'Intended Parents'
      url = 'intendents'
    }
    setTitle(title)

    const getData = async () => {
      setLoading(true)
      const json = await GET(`/admin/profiles/${url}`)
      setList(json.data || [])
      setLoading(false)
    }

    getData()
  }, [history?.match?.url])
  return (
    <div>
      <Header />
      <div className="container">
        <div className="table">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              data={list.filter(
                (item) =>
                  String(item.full_name).toLowerCase().includes(filter.toLowerCase()) ||
                  String(item.spouse).toLowerCase().includes(filter.toLowerCase()) ||
                  String(item.age).toLowerCase().includes(filter.toLowerCase()) ||
                  String(item.sex).toLowerCase().includes(filter.toLowerCase())
              )}
              pagination
              striped
              defaultSortField="id"
              defaultSortAsc={false}
              noHeader
              subHeader
              subHeaderComponent={
                <>
                  <h1 className="title">{title}</h1>
                  <input onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
                </>
              }
              customStyles={{
                rows: {
                  style: {
                    fontSize: '16px',
                    minHeight: '50px'
                  }
                },
                headCells: {
                  style: {
                    background: '#1b3661',
                    color: 'white',
                    fontSize: '16px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    minHeight: 'initial'
                  },
                  activeSortStyle: {
                    background: '#1b3661',
                    color: 'white'
                  }
                },
                cells: {
                  style: {
                    paddingLeft: '8px',
                    paddingRight: '8px'
                  }
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Table
